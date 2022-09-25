import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function allUser(req, res) {
  try {
    const alluser = await userModel.findOne({});
    res.status(200).json(alluser);
  } catch (error) {
    res.status(401).json(error);
  }
}

export async function getUser(req, res) {
  const email = req.params.email;
  try {
    const user = await userModel.findOne({ email: email });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
}

export async function userauth(req, res) {
  const email = req.auth;
  try {
    if (!email) {
      return res.status(500).json("Invalid token");
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(500).json("User is not found");
    }
    const newuser = { ...user._doc };
    delete newuser.password;
    res.status(400).json(newuser);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(500).json("All fields are required");
    }
    const isUserExist = await userModel.findOne({ email: email });
    if (!isUserExist) {
      return res.status(500).json("User is not exists please register first.");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (isPasswordCorrect) {
      return res.status(200).json(isUserExist);
    }
    res.status(400).json("Password is invalid");
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(500).json("All fields are required");
    }
    if (
      !email.match(
        /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      )
    ) {
      return res.status(502).json("Email is not valid");
    }

    const user = await userModel.findOne({ email: email });
    const user_name = await userModel.findOne({ name: name });
    if (user || user_name) {
      return res.status(201).json(user);
    }
    const token = await jwt.sign({ email: email }, process.env.SCRETEKEY);
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    let useris = await new userModel({
      name: name,
      email: email,
      password: hashpassword,
      token: token,
    });
    await useris.save();
    const newuser = { ...useris._doc };
    delete newuser.password;
    res.status(200).json(newuser);
  } catch (e) {
    res.status(501).json("An unknown error occurred or " + e);
  }
}

export async function updateUser(req, res) {
  const email = req.auth;
  const { name, password } = req.body;
  try {
    const updateuser = await userModel.findOneAndUpdate(
      { email: email },
      { $set: { name: name, password: password } },
      { new: true }
    );
    res.status(201).json(updateuser);
  } catch (error) {
    res.status(501).json("An unknown error occurred.");
  }
}
export async function deleteUser(req, res) {
  const email = req.auth;
  try {
    await userModel.findOneAndDelete({ email: email });
    res.status(201).json("User got deleted");
  } catch (error) {
    res.status(501).json("An unknown error occurred.");
  }
}
