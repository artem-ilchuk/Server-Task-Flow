import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    deadline: {
      type: Date,
      default: null,
    },
    img: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
