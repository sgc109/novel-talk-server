import mongoose from 'mongoose';

const { Schema } = mongoose;

const Story = new Schema({
  title: { type: String, required: true },
  series: { type: Schema.Types.ObjectId, ref: 'Series' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  cntComments: { type: Number, default: 0 },
  cntView: { type: Number, default: 0 },
  sumScore: { type: Number, default: 0.0 },
  cntEval: { type: Number, default: 0 },
}, {
  timestamps: { createdAt: true, updatedAt: true },
});

export default mongoose.models.Story || mongoose.model('Story', Story);
