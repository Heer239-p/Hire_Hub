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

    // Create user object with defaults for company fields
    const userData = {
      firstName,
      lastName,
      mobile,
      email,
      password: hashedPassword,
      role: role || "user",
      profileImage,
    };
if (role !== "employer" && (companyName || companyWebsite || companyDescription || industry)) {
  return res.status(400).json({ message: "Only employers can add company details" });
}

    // Only set company fields if role is employer, using defaults if missing
    if (role === "employer") {
      userData.companyName = companyName || "Unknown Company";
      userData.companyWebsite = companyWebsite || "";
      userData.companyDescription = companyDescription || "";
      userData.industry = industry || "";
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


// ==========================
// LOGOUT USER
// ==========================
export const logoutUser = async (req, res) => {
  try {
    // On client-side, token will be removed from localStorage/cookies.
    // If you’re using cookies for auth, you can clear it here.
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout failed", error });
  }
};

