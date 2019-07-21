import mongoose from 'mongoose';

const { Schema } = mongoose;

const Story = new Schema({
  title: { type: String, required: true },
  seriesId: { type: Schema.Types.ObjectId, ref: 'Series' },
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
});

Story.statics.create = function create(title, seriesId, authorId) {
  const story = new this({
    title,
    seriesId,
    authorId,
  });

  return story.save();
};

export default mongoose.models.Story || mongoose.model('Story', Story);
