import { generateToken } from "../lib/utils.js";

export const login = (req, res) => {
  const { password } = req.body;
  try {
    const isPasswordCorrect = password === process.env.PASSWORD;

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken();
  } catch (error) {}
};
