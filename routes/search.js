const {Router} = require('express');
const {validationResult, body} = require('express-validator');
const request = require('request-promise-any');
const config = require('../config');
const History = require('../models/History');
const Like = require('../models/Like');

const router = Router();

// api/search
router.post('/', body('keyword').isString().notEmpty(), async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({message: 'Validation error'});
    }

    const userId = req.userId;
    const token = req.token;
    const resp = {};
    if (token) {
      resp.token = token;
    }
    const {keyword} = req.body;

    const {results} = await request({
      url: config.imgApi.url,
      qs: {
        'client_id': config.imgApi.clientId,
        'per_page': 10,
        query: keyword,
        orientation: 'squarish'
      },
      json: true
    });

    if (results.length) {
      await History.saveKeyword(userId, keyword);
      const imageIds = await Like.findByUserId(userId);
      resp.images = results.map(img => ({
        id: img.id,
        title: img.description || keyword,
        like: imageIds.includes(img.id),
        src: img.urls.thumb,// regular, small, thumb
        alt: img.alt_description || keyword
      }));
    } else {
      resp.images = [];
    }
    res.json(resp);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'An error occurred while searching'});
  }
});

module.exports = router;
