import mongoose from 'mongoose';

const { Schema } = mongoose;


function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `사용자_${result}`;
}


const User = new Schema({
  _id: { type: String, required: true, unique: true },
  nickname: { type: String, unique: true, required: true },
  isOfficial: { type: Boolean, default: false },
  profileImage: {
    data: Buffer,
    contentType: String,
    // default: '',
  },
  createdDate: { type: Date, default: Date.now },

}, { _id: false });


User.statics.getRandomUniqueNickname = async function () {
  const nickName = makeid(6);
  const unique = (await this.findOneByNickname(nickName)) === null;
  if (unique) return nickName;
  return this.getRandomUniqueNickname();
};

User.statics.create = async function (uid) {
  const nickname = await this.getRandomUniqueNickname();
  const user = new this({
    _id: uid,
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
