import { Webhook } from 'svix';
import userModel from '../models/userModel.js';
import Razorpay from 'razorpay';
import transactionModel from '../models/transactionModel.js';


// Your existing clerkWebhooks unchanged
const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature']
    });

    const { data, type } = req.body;

    switch (type) {
      case 'user.created': {
        const userData = {
          clerkID: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url
        };

        await userModel.create(userData);
        res.json({});
        break;
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url
        };

        await userModel.findOneAndUpdate({ clerkID: data.id }, userData);
        res.json({});
        break;
      }

      case 'user.deleted': {
        await userModel.findOneAndDelete({ clerkID: data.id });
        res.json({});
        break;
      }

      default:
        res.status(400).json({ success: false, message: 'Unsupported webhook type.' });
    }
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Updated userCredits controller
const userCredits = async (req, res) => {
  try {
    const { clerkID } = req;  // get clerkID from req, set by auth middleware

    const userData = await userModel.findOne({ clerkID });

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, credits: userData.creditBalance });

  } catch (error) {
    console.error('Credits fetch error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//gateway initalise

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { planId } = req.body;
    const clerkID = req.clerkID;  // use clerkID from middleware

    if (!planId) {
      return res.status(400).json({ success: false, message: 'Plan ID is required' });
    }

    const userData = await userModel.findOne({ clerkID });

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let credits, plan, amount;

    switch (planId) {
      case 'Basic':
        plan = 'Basic';
        credits = 100;
        amount = 10;
        break;

      case 'Advanced':
        plan = 'Advanced';
        credits = 500;
        amount = 50;
        break;

      case 'Business':
        plan = 'Business';
        credits = 5000;
        amount = 250;
        break;

      default:
        return res.status(400).json({ success: false, message: 'Invalid plan selected' });
    }

    const date = Date.now();

    // Create transaction in DB
    const transactionData = {
      clerkID,    // keep consistent naming
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY || 'INR',
      receipt: newTransaction._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    return res.json({ success: true, order });

  } catch (error) {
    console.error('Payment error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//API controller function to verify razorpay payment
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderinfo.status === 'paid') {
      const transactionData = await transactionModel.findById(orderinfo.receipt);

      if (transactionData.payment) {
        return res.json({ success: false, message: 'Payment already verified.' });
      }

      const userData = await userModel.findOne({ clerkID: transactionData.clerkID });

      if (!userData) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const creditBalance = userData.creditBalance + transactionData.credits;

      await userModel.findByIdAndUpdate(userData._id, { creditBalance });
      await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

      res.json({ success: true, message: 'Credits added successfully' });

    } else {
      res.json({ success: false, message: 'Payment not completed' });
    }

  } catch (error) {
    console.error('Payment error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { clerkWebhooks, userCredits, paymentRazorpay, verifyRazorpay };
