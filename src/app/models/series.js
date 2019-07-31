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
});

Series.statics.create = function (title, authorId, coverImage, genreIds) {
  const series = new this({
    title,
    authorId,
    coverImage,
    genreIds,
  });

  return series.save();
};

export default mongoose.models.Series || mongoose.model('Series', Series);
