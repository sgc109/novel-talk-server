import mongoose from 'mongoose';

const { Schema } = mongoose;

const Comment = new Schema({
  story: { type: Schema.Types.ObjectId, ref: 'Story' },
  series: { type: Schema.Types.ObjectId, ref: 'Series' },
  writer: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  isHidden: { type: Boolean, default: false },
  cntLike: { type: Number, default: 0 },
}, {
  timestamps: { createdAt: true, updatedAt: true },
});

export default mongoose.models.Comment || mongoose.model('Comment', Comment);
