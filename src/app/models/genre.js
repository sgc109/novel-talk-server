import mongoose from 'mongoose';

const { Schema } = mongoose;

const Genre = new Schema({
  title: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  coverImage: {
    data: Buffer,
    contentType: String,
  },
});

Genre.statics.create = function (title, description, coverImage) {
  const genre = new this({
    title,
    description,
    coverImage,
  });

  return genre.save();
};

Genre.statics.getAllGenres = async function () {
  const genres = await this.find();
  return genres;
};

export default mongoose.models.Genre || mongoose.model('Genre', Genre);
