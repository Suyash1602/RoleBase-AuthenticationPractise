const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


//testing
const pong = async (req, res) => {
  res.send("PONG");
};

//register controller
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res
      .status(201)
      .json({ message: `${role} registered with username ${username}` });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//login controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res
        .status(404)
        .json({ message: `No user found with username ${username}` });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: `Invalid Credentials` });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1H" }
    );

    res.status(200).json({
      message: "Login Success.",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};




module.exports = { register, login ,pong};
