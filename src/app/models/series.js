import mongoose from 'mongoose';

const { Schema } = mongoose;

const Series = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
  isRecommend: { type: Boolean }, // indexing 하기
  cntStories: { type: Number, default: 0 },
  coverImage: { type: String, required: true },
  lastWrittenAt: { type: Date, default: '1970-01-01' },
}, {
  timestamps: { createdAt: true, updatedAt: true },
});

export default mongoose.models.Series || mongoose.model('Series', Series);
