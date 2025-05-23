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
  try {
    const courseData = req.body;
    const newCourse = await Course.create(courseData);
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

export const CourseController = {
  getAllCourses,
  createCourse,
  courseEnrollment,
  getSingleCourse,
};
