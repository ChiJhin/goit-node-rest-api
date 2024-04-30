import { catchAsync } from '../helpers/catchAsync.js';
import { User } from '../models/usersModel.js';
import { checkUser, register, updateAvatarService } from '../services/userServices.js';

export const signUp = catchAsync(async (req, res) => {
  const newUser = await register(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

export const logIn = catchAsync(async (req, res) => {
  const user = await checkUser(req.body);

  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

export const logout = catchAsync(async (req, res) => {
  const { _id } = req.user;

  await User.findOneAndUpdate(_id, { token: null });

  res.status(204).send();
});

export const getCurrent = catchAsync(async (req, res) => {
  const { email, subscription } = await req.user;

  res.status(200).json({
    email,
    subscription,
  });
});

export const updateAvatar = catchAsync(async (req, res) => {
  const updatedUser = await updateAvatarService(req.body, req.user, req.file);

  res.status(200).json({
    user: updatedUser,
  });
});
