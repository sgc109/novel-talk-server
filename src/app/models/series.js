import mongoose from 'mongoose';

const { Schema } = mongoose;

const Series = new Schema({
  title: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  genreIds: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  cntStories: { type: Number, default: 0 },
  coverImage: {
    data: Buffer,
    contentType: String,
    // default: '',
  },
  lastWrittenAt: { type: Date, default: '1970-01-01' },
}, {
  timestamps: { createdAt: true, updatedAt: true },
});

export default mongoose.models.Series || mongoose.model('Series', Series);
