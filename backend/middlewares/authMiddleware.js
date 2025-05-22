// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authenticate = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token:', token); // Log the token for debugging

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded User:', decoded); // Log the decoded user

      req.user = await User.findById(decoded.id).select('-password');
      console.log('Authenticated User:', req.user); // Log the fetched user

      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return next(); // ✅ Proceed to next middleware or route
    } catch (err) {
      console.error('Auth middleware error:', err.message);
      return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  }

  // Only runs if no token was found at all
  console.warn('No token provided in request headers');
  return res.status(401).json({ message: 'Not authorized, no token' });
};

export default authenticate; // ✅ Export the correct function
