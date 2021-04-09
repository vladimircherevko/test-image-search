const {model, Schema} = require('mongoose');

const schema = new Schema({
  // _id: {type: String, required: true}
});

module.exports = model('User', schema);
