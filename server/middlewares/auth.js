import jwt from 'jsonwebtoken';

// Middleware to extract and attach clerkID from token
const authUser = async (req, res, next) => {
  try {
    // Accept token from either Authorization header or custom header
    const authHeader = req.headers.authorization || req.headers.token;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' });
    }

    // Extract token value
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    const tokenDecoded = jwt.decode(token);

    if (!tokenDecoded || !tokenDecoded.clerkID) {
      return res.status(403).json({ success: false, message: 'Invalid token.' });
    }

    // Attach clerkID to request object
    req.clerkID = tokenDecoded.clerkID;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(500).json({ success: false, message: 'Server error during authentication.' });
  }
};

export default authUser;
