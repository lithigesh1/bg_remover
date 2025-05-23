import jwt from 'jsonwebtoken';

// Middleware function to decode JWT token to get clerkID
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' });
    }

    const token_decode = jwt.decode(token);

    if (!token_decode || !token_decode.clerkID) {
      return res.status(403).json({ success: false, message: 'Invalid token.' });
    }

    req.body.clerkID = token_decode.clerkID;
    next();

  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(500).json({ success: false, message: 'Server error during authentication.' });
  }
};

export default authUser;
