import messageModel from "../models/message.js";
import conversationModel from "../models/conversation.js";

export const getMessage = async (req, res) => {
  const email = req.auth;
  try {
    const conversation = await conversationModel.find({
      email: email,
    });
    if (!conversation) {
      return res.status(400).json("No conversation found!");
    }
    const conversationid = conversation._id;
    const messageis = await new messageModel({
      conversationid: conversationid,
      sender: email,
      message: message,
    });
    await messageis.save();
    res.status(200).json(messageis);
  } catch (error) {
    res.status().json(error);
  }
};

export const createMessage = async (req, res) => {
  const email = req.auth;
  const reciever = req.params.reciever;
  const { message } = req.body;
  try {
    if (!message || !reciever) {
      return res.status(400).json("All fields required!");
    }
    const conversation = await conversationModel.findOne({
      email: email,
      reciever: reciever,
    });
    if (!conversation) {
      return res.status(400).json("No conversation found!");
    }
    const conversationid = conversation._id;
    const messageis = await new messageModel({
      conversationid: conversationid,
      sender: email,
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
  const reciever = req.params.reciever;
  const { message } = req.body;
  try {
    if (!message || !reciever) {
      return res.status(400).json("All fields required!");
    }
    const conversation = await conversationModel.findOne({
      email: email,
      reciever: reciever,
    });
    if (!conversation) {
      return res.status(400).json("No conversation found!");
    }
    const conversationid = conversation._id;
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
