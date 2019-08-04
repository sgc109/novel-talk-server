import mongoose from 'mongoose';

const { Schema } = mongoose;

const Story = new Schema({
  title: { type: String, required: true },
  seriesId: { type: Schema.Types.ObjectId, ref: 'Series' },
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  cntComment: { type: Number, default: 0 },
  cntView: { type: Number, default: 0 },
  sumScore: { type: Number, default: 0.0 },
  cntEval: { type: Number, default: 0 },
  coverImage: {
    data: Buffer,
    contentType: String,
    // default: '',
  },
}, {
  timestamps: { createdAt: true, updatedAt: true },
});

export default mongoose.models.Story || mongoose.model('Story', Story);
