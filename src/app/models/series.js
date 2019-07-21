import mongoose from 'mongoose';

const { Schema } = mongoose;

const Series = new Schema({
  title: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  coverImage: {
    data: Buffer,
    contentType: String,
    // default: '',
  },
  date: { type: Date, default: Date.now },
});

Series.statics.create = function (title, authorId) {
  const series = new this({
    title,
    authorId,
  });

  return series.save();
};

export default mongoose.models.Series || mongoose.model('Series', Series);
