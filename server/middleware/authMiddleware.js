const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const userEmail = req.headers['x-user-email'];

  if (!userEmail) {
    return res.status(401).json({ message: 'No user email provided' });
  }

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid user email' });
  }
};

module.exports = authMiddleware;
