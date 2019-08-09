import mongoose from 'mongoose';

const { Schema } = mongoose;

const Genre = new Schema({
  title: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  coverImageUrl: { type: String, default: '' },
}, {
  timestamps: { createdAt: true, updatedAt: true },
});

Genre.statics.getAllGenres = async function () {
  const genres = await this.find();
  return genres;
};

export default mongoose.models.Genre || mongoose.model('Genre', Genre);
