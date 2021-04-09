const {Router} = require('express');
const History = require('../models/History');

const router = Router();

// api/history
router.get('/', async (req, res) => {
  try {
    const userId = req.userId;
    const history = await History.findByUserId(userId);
    res.json({history});
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'An error occurred while history getting'});
  }
});

module.exports = router;
