import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }
});

const Attachment =
  mongoose.models.Attachment || mongoose.model("Attachment", attachmentSchema);
export default Attachment;
