import sendResponse from "../../utils/sendResponse.js";
import { User } from "../user/auth.model.js";
import { Stories } from "./stories.model.js";

const getAllStories = async (req, res) => {
  try {
    const stories = await Stories.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStory = async (req, res) => {
  try {
    const newStory = await story.create(req.body);
    if (newStory) {
      const updatedUser = await User.findByIdAndUpdate(
        req.body.user,
        { $push: { stories: newStory._id } },
        { new: true }
      );
    }
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Story created successfully",
      data: newStory,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSingleStory = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Stories.findById(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Story retrieved successfully",
      data: story,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const StoryController = {
  getAllStories,
  createStory,
  getSingleStory,
};
