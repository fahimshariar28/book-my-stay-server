import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "./../utils/createError.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: password,
      country: req.body.country,
      city: req.body.city,
      phone: req.body.phone,
      img: req.body.img,
    });
    await newUser.save();
    res.status(200).json("User has been created successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return next(createError(400, "Wrong password"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: "3d" }
    );

    const { password, isAdmin, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...others });
  } catch (error) {
    next(error);
  }
};
