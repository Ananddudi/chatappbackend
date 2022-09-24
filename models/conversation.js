import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    reciever: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const conversationModel = mongoose.model("Conversation", conversationSchema);
export default conversationModel;
