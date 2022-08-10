import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  address: {
    type: String,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    },
  ],
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Post", PostSchema);
