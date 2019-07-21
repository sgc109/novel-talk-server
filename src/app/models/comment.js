import mongoose from 'mongoose';

const { Schema } = mongoose;

const Comment = new Schema({
  storyId: { type: Schema.Types.ObjectId, ref: 'Story' },
  writerId: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  isHidden: { type: Boolean, default: false },
  cntLike: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

Comment.statics.create = function create(storyId, writerId, content) {
  const comment = new this({
    storyId,
    writerId,
    content,
  });

  return comment.save();
};

export default mongoose.models.Comment || mongoose.model('Comment', Comment);
