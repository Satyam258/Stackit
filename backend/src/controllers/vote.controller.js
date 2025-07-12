import Vote from "../models/vote.model.js";

export const castVote = async (req, res) => {
  try {
    const { targetId, targetType, voteType } = req.body;
    const userId = req.user._id;

    if (!["Question", "Answer", "Comment"].includes(targetType)) {
      return res.status(400).json({ message: "Invalid targetType" });
    }

    if (!["upvote", "downvote"].includes(voteType)) {
      return res.status(400).json({ message: "Invalid voteType" });
    }

    
    const existingVote = await Vote.findOne({ user: userId, targetId, targetType });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        return res.status(400).json({ message: "You already voted" });
      }

      
      existingVote.voteType = voteType;
      await existingVote.save();

      return res.status(200).json({ message: "Vote updated", vote: existingVote });
    }

  
    const newVote = new Vote({
      user: userId,
      targetId,
      targetType,
      voteType,
    });

    await newVote.save();
    res.status(201).json({ message: "Vote casted", vote: newVote });
  } catch (error) {
    console.error("Vote error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeVote = async (req, res) => {
  try {
    const { targetId, targetType } = req.body;
    const userId = req.user._id;

    const vote = await Vote.findOneAndDelete({ user: userId, targetId, targetType });

    if (!vote) {
      return res.status(404).json({ message: "Vote not found" });
    }

    res.status(200).json({ message: "Vote removed" });
  } catch (error) {
    console.error("Remove vote error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const countVotes = async (req, res) => {
  try {
    const { targetId, targetType } = req.params;

    const upvotes = await Vote.countDocuments({ targetId, targetType, voteType: "upvote" });
    const downvotes = await Vote.countDocuments({ targetId, targetType, voteType: "downvote" });

    res.status(200).json({ upvotes, downvotes });
  } catch (error) {
    console.error("Count vote error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
