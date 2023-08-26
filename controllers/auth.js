import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { HttpError } from "../helpers/HttpError.js";
import ctrlWrapper from "./ctrlWrapper.js";

//signup
const register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: gravatar.url(email, { s: 250, d: "identicon", protocol: "https" }),
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
      avatarURL: newUser.avatarURL,
    },
  });
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  const { SECRET_KEY } = process.env;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "365d" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  });
};

// current user info
const getCurrent = async (req, res) => {
  const { email, name, avatarURL, _id } = req.user;
  res.json({ _id, name, email, avatarURL });
};

//logout
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "Logout sucsessfull" });
};

// Update User
const updateUserInfo = async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;

  let updateFields = {};
  if (name) {
    updateFields.name = name;
  }
  if (req.file) {
    const avatarURL = req.file.path;
    updateFields.avatarURL = avatarURL;
  }
  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }
  const updatedUser = await User.findByIdAndUpdate(_id, updateFields, { new: true });
  res.status(200).json({ name: updatedUser.name, avatarUrl: updatedUser.avatarURL });

};

// decoration
const ctrl = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateUserInfo: ctrlWrapper(updateUserInfo),
};

//export

export default ctrl;
