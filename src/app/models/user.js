/* eslint-disable func-names */
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;


const userSchema = new Schema({
  nickname: { type: String, unique: true },
  oauthId: { type: String, required: true },
  provider: { type: String, required: true },
  isOfficial: { type: Boolean, default: false },
  profileImage: { type: String, default: '' },
}, {
  timestamps: { createdAt: true, updatedAt: true },
});


function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `사용자_${result}`;
}

// userSchema.methods.getRandomUniqueNickname = async function () {
//   const nickName = makeid(6);
//   const unique = (await this.model('User').findOneByNickname(nickName)) === null;
//   if (unique) return nickName;
//   return this.model('User').getRandomUniqueNickname();
// };

// userSchema.methods.findOneByNickname = async function (nickname) {
//   const user = await this.findOne({ nickname }).exec();
//   return user;
// };

// userSchema.statics.create = function (nickname, oauthId, provider) {
//   const user = new this({
//     nickname,
//     oauthId,
//     provider,
//   });

//   return user.save();
// };


userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'novel-talk', { expiresIn: 60 * 60 * 2 });
  return token;
};


// userSchema.pre('save', async function (next) {
//   const user = this;
//   user.nickname = await this.model('User').getRandomUniqueNickname();
//   console.log(`save user nickname ${user.nickname}`);
//   next();
// });

const User = mongoose.model('User', userSchema);

export default mongoose.models.User || User;
