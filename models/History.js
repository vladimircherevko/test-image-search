const {model, Schema} = require('mongoose');

const schema = new Schema({
  _id: {type: String, required: true},
  userId: {type: String, required: true},
  keyword: {type: String, required: true},
  date: Number
});
schema.index({userId: 1});
schema.statics.saveKeyword = saveKeyword;
schema.statics.findByUserId = findByUserId;

/**
 * Retains a new or updates an existing keyword for a specific user 
 * @param {string} userId user id
 * @param {string} keyword new keyword
 */
async function saveKeyword(userId, keyword) {
  await this.updateOne({_id: userId + ':' + keyword}, {userId, keyword, date: Date.now()}, {
    upsert: true,
    runValidators: true
  });
}

/**
 * Returns keyword list of specific user
 * @param {string} userId user id
 * @returns {Array<string>} list of keywords
 */
async function findByUserId(userId) {
  const list = await this.find({userId}).sort('date').lean();
  return list.map(obj => obj.keyword);
}

module.exports = model('History', schema);
