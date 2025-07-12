import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    // .populate("proficiencies.tag", "name");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId).select("-password");
    // .populate(
        // "proficiencies.tag",
        //  "name");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("getUserById error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("updateUserProfile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateUserProficiencies = async (req, res) => {
  try {
    const { proficiencies } = req.body;

    if (!Array.isArray(proficiencies)) {
      return res.status(400).json({ message: "Invalid proficiencies format" });
    }

    const valid = proficiencies.every(
      (p) =>
        p.tag &&
        mongoose.Types.ObjectId.isValid(p.tag) &&
        ["beginner", "intermediate", "expert"].includes(p.level)
    );

    if (!valid) {
      return res.status(400).json({ message: "One or more proficiency entries are invalid" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { proficiencies },
      { new: true, runValidators: true }
    ).populate("proficiencies.tag", "name");

    res.status(200).json({
      message: "Proficiencies updated successfully",
      proficiencies: user.proficiencies,
    });
  } catch (error) {
    console.error("updateUserProficiencies error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
