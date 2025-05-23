import sendResponse from "../../utils/sendResponse.js";
import { User } from "./auth.model.js";

const getAllUsers = async (req, res) => {
  try {
    const response = await User.find();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully",
      data: response,
    });
  } catch (error) {}
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await User.create(userData);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email })
      .populate({
        path: "courses",
        select: "-enrolledUsers",
      })
      .populate({
        path: "bookings",
        populate: {
          path: "mentor",
          select: "-bookings",
        },
      })
      .populate("stories")
      .populate({ path: "jobs", populate: { path: "applications" } })
      .populate({
        path: "applications",
        populate: { path: "job", select: "-applicantions" },
      });

    if (!user) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found.",
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User found.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const AuthController = {
  getAllUsers,
  createUser,
  checkAuth,
};
