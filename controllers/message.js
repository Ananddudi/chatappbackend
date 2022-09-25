import messageModel from "../models/message.js";
import conversationModel from "../models/conversation.js";

export const getMessage = async (req, res) => {
  const conversationId = req.params.id;
  // const user = req.auth;
  // const { seconduser } = req.body;
  try {
    //   const conversationone = await conversationModel.findOne({
    //     user: user,
    //     reciever: seconduser,
    //   });
    //   const conversationtwo = await conversationModel.findOne({
    //     user: seconduser,
    //     reciever: user,
    //   });
    //   if (!conversationone && !conversationtwo) {
    //     return res.status(400).json("No conversation found!");
    //   }
    //   const conversationid = conversationone && conversationone._id;
    //   conversationid = conversationtwo && conversation._id;
    const messages = await messageModel.find({
      conversationid: conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status().json(error);
  }
};

export const createMessage = async (req, res) => {
  const sender = req.auth;
  const { conversationId, message } = req.body;
  try {
    if (!message || !conversationId) {
      return res.status(400).json("All fields required!");
    }
    const messageis = await new messageModel({
      conversationid: conversationId,
      sender: sender,
      message: message,
    });
    await messageis.save();
    res.status(200).json(messageis);
  } catch (error) {
    res.status().json(error);
  }
};

export const deleteMessage = async (req, res) => {
  const email = req.auth;
  const { message, conversationid } = req.body;
  try {
    if (!message || !conversationid) {
      return res.status(400).json("All fields required!");
    }
    await messageModel.findOneAndDelete({
      conversationid: conversationid,
      sender: email,
      message: message,
    });

    res.status(200).json("Message get deleted!");
  } catch (error) {
    res.status().json(error);
  }
};
