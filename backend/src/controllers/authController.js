import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// ==========================
// REGISTER USER
// ==========================
export const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    mobile,
    email,
    password,
    role,
    companyName,
    companyWebsite,
    companyDescription,
    industry,
  } = req.body;

  // Profile image uploaded via multer
  const profileImage = req.file ? req.file.filename : null;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const userData = {
      firstName,
      lastName,
      mobile,
      email,
      password: hashedPassword,
      role: role || "user",
      profileImage,
    };

    // Only set company fields if role is employer
    if (role === "employer") {
      userData.companyName = companyName;
      userData.companyWebsite = companyWebsite;
      userData.companyDescription = companyDescription;
      userData.industry = industry;
    }

    // Create new user
    const user = await User.create(userData);

    // Send response
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      companyName: user.companyName,
      companyWebsite: user.companyWebsite,
      companyDescription: user.companyDescription,
      industry: user.industry,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

// ==========================
// LOGIN USER
// ==========================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        companyName: user.companyName,
        companyWebsite: user.companyWebsite,
        companyDescription: user.companyDescription,
        industry: user.industry,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed", error });
  }
};
