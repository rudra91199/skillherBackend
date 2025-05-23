import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    postedDate: { type: Date, default: Date.now },
    salary: { type: String, required: true },
    logo: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
    applications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "jobApplications" },
    ],
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.model("jobs", jobSchema);
