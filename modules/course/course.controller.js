import sendResponse from "../../utils/sendResponse.js";
import { Course } from "./course.model.js";
import { User } from "../user/auth.model.js";
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user && user.role !== "admin") {
      return res
        .status(403)
        .json({ sucsess: false, message: "Unauthorized access" });
    }
    const courseData = new Course(req.body);
    const newCourse = await courseData.save();
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editCourse = async (req, res) => {
  const { id } = req.params;
  const { user, ...UpdatedData } = req.body;
  try {
    const userExist = await User.findById(user);
    if (userExist && userExist.role !== "admin") {
      return res
        .status(403)
        .json({ sucsess: false, message: "Unauthorized access" });
    }
    const updatedCourse = await Course.findByIdAndUpdate(id, UpdatedData, {
      new: true,
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course edited successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course retrieved successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const courseEnrollment = async (req, res) => {
  const { userId } = req.params;
  const { courseId } = req.body;
  try {
    const response = await Course.findByIdAndUpdate(
      courseId,
      { $push: { enrolledUsers: { user: userId } } },
      { new: true }
    );
    if (response) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { courses: courseId } },
        { new: true }
      );
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course enrolled successfully",
        data: { updatedUser, response },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const handleDeleteCourse = async (req, res) => {
  try {
    const courses = await Course.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Course delete successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const CourseController = {
  getAllCourses,
  createCourse,
  courseEnrollment,
  getSingleCourse,
  editCourse,
  handleDeleteCourse,
};
