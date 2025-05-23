import { Job } from "./job.model.js";
import sendResponse from "../../utils/sendResponse.js";
import { jobApplication } from "./jobApplications.model.js";
import { User } from "../user/auth.model.js";
import mongoose from "mongoose";

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({status:"active"});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobsByEmployer = async (req, res) => {
  const { id } = req.params;
  try {
    const jobs = await Job.find({ employer: id }).populate({
      path: "applications",
      populate: {
        path: "applicant",
        select: "email",
      },
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Jobs retrieved successfully",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const jobData = req.body;
    const newJob = await Job.create(jobData);
    if (newJob) {
      const updateUser = await User.findByIdAndUpdate(jobData.employer, {
        $push: { jobs: newJob._id },
      });
    }
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Job created successfully",
      data: newJob,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Job retrieved successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createJobApplication = async (req, res) => {
  const newApplication = await jobApplication.create(req.body);
  if (newApplication) {
    const updateJob = await Job.findByIdAndUpdate(req.body.job, {
      $push: { applications: newApplication._id },
    });
    const updateUser = await User.findByIdAndUpdate(req.body.applicant, {
      $push: { applications: newApplication._id },
    });
  }
  sendResponse(res, {
    statusCode: 201,
    message: "Application created.",
    success: true,
    data: newApplication,
  });
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApplications = async (req, res) => {
  const { id } = req.params;
  try {
    const applications = await jobApplication.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "job",
          foreignField: "_id",
          as: "jobData",
        },
      },
      { $unwind: "$jobData" },
      {
        $match: {
          "jobData.employer": new mongoose.Types.ObjectId(id),
        },
      },
    ]);

    const populatedApplications = await jobApplication.populate(applications, {
      path: "applicant",
      select: "email",
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Applications retrieved successfully",
      data: populatedApplications,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleApplicationStatusChange = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedApplication = await jobApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Application status updated successfully",
      data: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleJobActivityStatusChange = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const response = await Job.findByIdAndUpdate(id, { status }, { new: true });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "job status updated successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const jobController = {
  getAllJobs,
  createJob,
  getSingleJob,
  createJobApplication,
  getJobsByEmployer,
  getApplications,
  handleApplicationStatusChange,
  handleJobActivityStatusChange,
};
