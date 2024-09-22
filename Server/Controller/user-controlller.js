import User from "../Model/user.js";

export const SignUser = async (req, res) => {
  // req handles all the request from params or the body or the API , res act as response which needs to be send from backend to frontend like the status of the ongoing work
  try {
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();

    return res.status(200).json({ msg: `Signup success` });
  } catch (error) {
    return res.status(500).json({msg: `Signup error`})
  }
};
