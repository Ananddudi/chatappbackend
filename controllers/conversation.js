import conversationModel from "../models/conversation.js";
import userModel from "../models/user.js";

export const allConversation = async (req, res) => {
  const email = req.auth;
  try {
    const conversation = await conversationModel.find({
      user: email,
    });
    if (!conversation) {
      return res.status(401).json("No conversation found!");
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json("An Error Occurred " + error);
  }
};
export const getConversation = async (req, res) => {
  const email = req.auth;
  const reciever = req.params.receiverid;
  try {
    const conversation = await conversationModel.findOne({
      user: email,
      reciever: reciever,
    });
    if (!conversation) {
      return res.status(401).json("No conversation found!");
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json("An Error Occurred " + error);
  }
};

export const createConversation = async (req, res) => {
  const email = req.auth;
  const reciever = req.params.receiverid;
  try {
    if (!email || !reciever) {
      return res.status(500).json("All fields must be filled");
    }
    if (email === reciever) {
      return res.status(500).json("Both mails are same!");
    }

    const validuser = await userModel.findOne({ email: reciever });
    if (!validuser) {
      return res.status(500).json("No user as specified in parameters!");
    }
    const conversationexists = await conversationModel.findOne({
      user: email,
      reciever: reciever,
    });

    if (conversationexists) {
      return res.status(500).json("Every Conversation Must Be Unique!");
    }

    let conversationis = await new conversationModel({
      user: email,
      reciever: reciever,
    });
    await conversationis.save();
    res.status(200).json(conversationis);
  } catch (error) {
    res.status(500).json("An Error Occurred " + error);
  }
};
