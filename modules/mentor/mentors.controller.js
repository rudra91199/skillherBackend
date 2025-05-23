import { User } from "../user/auth.model.js";
import { Mentor } from "./mentor.model.js";
import sendResponse from "../../utils/sendResponse.js";
import { Booking } from "./booking.model.js";

const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMentor = async (req, res) => {
  try {
    const mentorData = req.body;
    const newMentor = await Mentor.create(mentorData);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Mentor created successfully",
      data: newMentor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleMentor = async (req, res) => {
  const { id } = req.params;
  try {
    const mentor = await Mentor.findById(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Mentor retrieved successfully",
      data: mentor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMentorProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const mentor = await Mentor.findOne({ user: id }).populate({
      path: "bookings",
      populate: {
        path: "user",
        select: "email",
      },
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Mentor retrieved successfully",
      data: mentor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bookMentor = async (req, res) => {
  const newBooking = await Booking.create(req.body);
  if (newBooking) {
    const updateMentor = await Mentor.findByIdAndUpdate(req.body.mentor, {
      $push: { bookings: newBooking._id },
    });
    const updateUser = await User.findByIdAndUpdate(req.body.user, {
      $push: { bookings: newBooking._id },
    });
  }
  sendResponse(res, {
    statusCode: 201,
    message: "Booking done.",
    success: true,
    data: newBooking,
  });
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const response = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking status updated successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const MentorController = {
  getAllMentors,
  createMentor,
  bookMentor,
  getSingleMentor,
  getMentorProfile,
  changeBookingStatus,
};
