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
  nickname: { type: String, unique: true, required: true },
  oauthId: { type: String, required: true },
  provider: { type: String, required: true },
  isOfficial: { type: Boolean, default: false },
  profileImage: {
    data: Buffer,
    contentType: String,
    // default: '',
  },
}, {
  timestamps: { createdAt: true, updatedAt: true },
});


User.statics.getRandomUniqueNickname = async function () {
  const nickName = makeid(6);
  const unique = (await this.findOneByNickname(nickName)) === null;
  if (unique) return nickName;
  return this.getRandomUniqueNickname();
};

User.statics.create = function (nickname, oauthId, provider) {
  const user = new this({
    nickname,
    oauthId,
    provider,
  });

  return user.save();
};


User.statics.findOneByNickname = async function (nickname) {
  return this.findOne({
    nickname,
  }).exec();
};

User.statics.findOrCreate = async function (provider, oauthId) {
  let user = await this.findOne({ provider, oauthId });
  if (!user) {
    user = await this.create(provider, oauthId);
  }
  return user;
};

export default mongoose.models.User || mongoose.model('User', User);
