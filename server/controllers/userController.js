import { Webhook } from 'svix';
import userModel from '../models/userModel.js';

// API Controller function to manage Clerk user with database
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


//API to fetch users credit
const userCredits = async(req,res) => {
    try{

        const {clerkID} = req.body

        const userData = await userModel.findOne({clerkID})

        res.json({sucess:true,credits:userData.creditBalance})

    }catch{
        console.error('Webhook error:', error.message);
    res.status(500).json({ success: false, message: error.message });
    }
}

export { clerkWebhooks, userCredits };
