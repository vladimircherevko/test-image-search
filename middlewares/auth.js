const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // 'Beared TOKEN'
    let userId = jwt.decode(token, config.jwtKey);
    if (!userId) {
      const user = await User.create({});
      userId = user._id.toString();
      req.token = jwt.sign(userId, config.jwtKey);
    }
    req.userId = userId;
    next();
  } catch (e) {
    next(e);
  }
};
