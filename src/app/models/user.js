import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema({
  nickname: { type: String, unique: true, required: true },
  isOfficial: { type: Boolean, default: false },
  profileImage: {
    data: Buffer,
    contentType: String,
    // default: '',
  },
  createdDate: { type: Date, default: Date.now },
});

User.statics.create = function (nickname) {
  const user = new this({
    nickname,
  });

  return user.save();
};

User.statics.findOneByNickname = async function (nickname) {
  return this.findOne({
    nickname,
  }).exec();
};

export default mongoose.models.User || mongoose.model('User', User);
