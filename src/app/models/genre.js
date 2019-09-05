import mongoose from 'mongoose';

const { Schema } = mongoose;

const Genre = new Schema({
  title: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  coverImageUrl: { type: String, default: '' },
  backgroundColor: {
    r: {
      type: Number, required: true, min: 0, max: 255,
    },
    g: {
      type: Number, required: true, min: 0, max: 255,
    },
    b: {
      type: Number, required: true, min: 0, max: 255,
    },
  },
}, {
  timestamps: { createdAt: true, updatedAt: true },
});

export default mongoose.models.Genre || mongoose.model('Genre', Genre);
