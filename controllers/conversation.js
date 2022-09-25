import conversationModel from "../models/conversation.js";
import userModel from "../models/user.js";

export const allConversation = async (req, res) => {
  const email = req.auth;
  try {
    const conversationfirst = await conversationModel.find({
      user: email,
    });
    const conversationsecond = await conversationModel.find({
      reciever: email,
    });
    if (!conversationfirst || !conversationsecond) {
      return res.status(401).json("No conversation found!");
    }
    const objs = [...conversationfirst, ...conversationsecond].flat(1);
    res.status(200).json(objs);
  } catch (error) {
    res.status(500).json("An Error Occurred " + error);
  }
};

export const getConversation = async (req, res) => {
  const email = req.auth;
  const { reciever } = req.body;
  try {
    if (!reciever) {
      return res.status(500).json("All fields required");
    }
    const conversationone = await conversationModel.findOne({
      user: email,
      reciever: reciever,
    });
    const conversationtwo = await conversationModel.findOne({
      user: reciever,
      reciever: email,
    });
    if (!conversationone && !conversationtwo) {
      return res.status(401).json("No conversation found!");
    }
    res.status(200).json({ ...conversationone, ...conversationtwo }._doc);
  } catch (error) {
    res.status(500).json("An Error Occurred " + error);
  }
};

export const createConversation = async (req, res) => {
  const email = req.auth;
  const { reciever } = req.body;
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
    const conversationExist = await conversationModel.findOne({
      user: email,
      reciever: reciever,
    });
    const conversationExists = await conversationModel.findOne({
      user: reciever,
      reciever: email,
    });

    if (conversationExist || conversationExists) {
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
