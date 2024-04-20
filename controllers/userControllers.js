import { catchAsync } from "../helpers/catchAsync.js";
import { User } from "../models/usersModel.js";
import { checkUser, registrate } from "../services/userServices.js";

export const singUp = catchAsync (async (req, res) => {
  const newUser = await registrate(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

export const logIn = catchAsync (async (req, res) => {
  const user = await checkUser(req.body);
  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

export const logout = catchAsync (async (req, res) => {
    const { id } = req.user;        
    await User.findByIdAndUpdate(id, { token: null });
    res.status(204).send();
});

export const getCurrent = catchAsync (async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({
      email,
      subscription,
    });     
}); 