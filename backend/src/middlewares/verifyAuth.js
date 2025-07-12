import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const adminToken = req.cookies.adminToken;
    const userToken = req.cookies.userToken;

    if (!adminToken && !userToken) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    let decoded, user = null;

    if (adminToken) {
      decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
      user = await Admin.findById(decoded.adminId).select("-password");
      if (!user) throw new Error("Admin not found");
      req.user = { ...user._doc, role: "admin" };
    } else if (userToken) {
      decoded = jwt.verify(userToken, process.env.JWT_SECRET);
      user = await User.findById(decoded.userId).select("-password");
      if (!user) throw new Error("User not found");
      req.user = { ...user._doc, role: "user" };
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
