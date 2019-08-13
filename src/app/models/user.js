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


function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `사용자_${result}`;
}

async function getRandomUniqueNickname() {
  const nickname = makeId(6);
  const unique = (await User.findOne({ nickname })) === null;
  if (unique) return nickname;
  return getRandomUniqueNickname();
}


userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'novel-talk', { expiresIn: 60 * 60 * 2 });
  return token;
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.nickname = await getRandomUniqueNickname();
  next();
});

const User = mongoose.model('User', userSchema);

export default mongoose.models.User || User;
