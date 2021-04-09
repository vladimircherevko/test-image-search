const {Router} = require('express');
const {validationResult, body} = require('express-validator');
const Like = require('../models/Like');

const router = Router();

// api/like
router.post('/', body('imageId').isString().notEmpty(), async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({message: 'Validation error'});
    }
    
    const userId = req.userId;
    const {imageId} = req.body;
    await Like.saveLike(userId, imageId);
        
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'An error occurred while liking'});
  }
});

module.exports = router;
