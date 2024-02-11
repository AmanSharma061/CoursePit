import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  clerkId: {
    type: String
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  },
  price: {
    type: Number
  },
  category: {
    type: String
  },
  attachments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attachment"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: false
  }
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
