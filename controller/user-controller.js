// this is an api


import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import User from "../model/user.js";
import Token from "../model/token.js";

dotenv.config();

export const signupUser = async (request, response) => {
  // request contains data sent from frontend to backend including headers, body, params
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const user = {
      name: request.body.name,
      username: request.body.username,
      password: hashedPassword,
    };
    // Validation
    const validatedUser = new User(user);
    await validatedUser.save();

    return response.status(200).json({ msg: "signup successful" });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Error while signing up the user!" });
  }
};

export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "Username not found!" });
  }
  try {
    let matchPassword = await bcrypt.compare(request.body.password, user.password);
    if (matchPassword) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      return response
        .status(200)
        .json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          name: user.name,
          username: user.username,
        });
    }
    else {
      return response.status(400).json({ msg: "Password not matched!" });
    }
  }
  catch (error) {
    return response.status(500).json({msg: 'Error while logging in user'})
  }
};
