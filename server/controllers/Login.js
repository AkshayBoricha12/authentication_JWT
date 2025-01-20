const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const env = require("dotenv");
const { createSecretToken } = require("../utils/GenerateToken");

env.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: "All input is required" });
  }
  const user = await User.findOne({ email });
  console.log("user:", user);
  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
  // const token = createSecretToken(user._id);
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGU0NWQ1N2U3MWI1MjIzZGM1OGI4YyIsImlhdCI6MTczNzM3NzY4MywiZXhwIjoxNzM3NjM2ODgzfQ.bCrDKcZcXhrWLrc-TfMzK1PpRCtuetvg1MhE613z5Uk
`;

  res.cookie("token", token, {
    path: "/", // Cookie is accessible from all paths
    expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
    secure: true, // Cookie will only be sent over HTTPS
    httpOnly: true, // Cookie cannot be accessed via client-side scripts
    sameSite: "None",
  });

  res.json({ token });
};
module.exports = login;
