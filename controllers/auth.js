import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
// import path from 'path';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import { User } from '../models/user.js';
import { HttpError } from '../helpers/HttpError.js';
import cloudinary from '../helpers/cloudinary.js';
import ctrlWrapper from './ctrlWrapper.js';

// const avatarDir = path.resolve('public', 'avatars');

//signup
const register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: gravatar.url(email, { s: 250, d: 'identicon', protocol: 'https' }),
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
    throw HttpError(401, 'Email or password is wrong');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
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
  await User.findByIdAndUpdate(_id, { token: '' });
  res.status(204).json({ message: 'Logout sucsessfull' });
};

// // Change Subscription
// const updateUserInfo = async (req, res) => {
//   const { _id } = req.user;
//   const updatedSubscription = await User.findByIdAndUpdate(_id, { subscription: req.body.subscription }, { new: true });
//   if (!updatedSubscription) throw HttpError(404, "Not found");
//   const { email, subscription } = updatedSubscription;
//   res.status(200).json({ email, subscription });
// };

// Add Avatar
const addAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: originalname } = req.file;
  const { url: avatarURL } = await cloudinary.uploader.upload(originalname, {
    folder: 'avatars',
  });

  await fs.unlink(originalname);

  const result = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
  res.status(201).json(result);
};

// Update User
const updateUserInfo = async (req, res) => {
  const { _id } = req.user;
  const { name, avatar} = req.body;
  let updateFields = {};
  if (name) {
    updateFields.name = name;
  }
  if (avatar) {
    const { path: originalname } = req.file;
    const { url: avatarURL } = await cloudinary.uploader.upload(originalname, {
      folder: 'avatars',
    });

    await fs.unlink(originalname);
    updateFields.avatarURL = avatarURL;
  }
  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }
  const updatedUser = await User.findByIdAndUpdate(_id, updateFields, { new: true });
  res.status(200).json({ message: 'User info updated successfully', user: updatedUser });
};

// decoration
const ctrl = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateUserInfo: ctrlWrapper(updateUserInfo),
  addAvatar: ctrlWrapper(addAvatar),
};

//export

export default ctrl;
