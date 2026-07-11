const { User, Owner } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const buildAuthToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

const registerControl = async (req, res) => {
  try {
    const data = req.body;

    // Check if email exists
    const existing = await User.findOne({
      email: data.email.toLowerCase(),
    });

    if (existing) {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await User.create({
      ...data,
      email: data.email.toLowerCase(),
      password: hashedPassword,
    });

    // Create owner document if role is OWNER
    if (data.role === "OWNER") {
      await Owner.create({
        user: user._id,
      });
    }

    // Generate JWT Token
    const token = buildAuthToken(user);

    // Remove password before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Send response
    return res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = buildAuthToken(user);
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
module.exports = {
  registerControl,
  loginController,
};
