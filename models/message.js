import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationid: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "No message yet!",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);
