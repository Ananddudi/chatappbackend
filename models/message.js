import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversation: {
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

export default messageModel = new mongoose.model("Message", messageSchema);
