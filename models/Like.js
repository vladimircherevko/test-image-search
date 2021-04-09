const {model, Schema} = require('mongoose');

const schema = new Schema({
  _id: {type: String, required: true},
  userId: {type: String, required: true},
  imageId: {type: String, required: true}
});
schema.index({userId: 1});
schema.statics.saveLike = saveLike;
schema.statics.findByUserId = findByUserId;

/**
 * Saves like of a specific image for a specific user 
 * @param {string} userId user id
 * @param {string} imageId image id
 */
async function saveLike(userId, imageId) {
  await this.create({_id: userId + ':' + imageId, userId, imageId});
}

/**
 * Returns image id list of specific user
 * @param {string} userId user id
 * @returns {Array<string>} image id list
 */
async function findByUserId(userId) {
  const list = await this.find({userId}).lean();
  return list.map(obj => obj.imageId);
}

module.exports = model('Like', schema);
