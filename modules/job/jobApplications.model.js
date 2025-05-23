import { model, Schema } from "mongoose";

const jobApplicationSchema = new Schema(
  {
    applicant: { type: Schema.Types.ObjectId, ref: "users" },
    job: { type: Schema.Types.ObjectId, ref: "jobs" },
    status: {
      type: String,
      enum: ["applied", "interviewed", "hired", "rejected"],
      default: "applied",
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: String, required: true },
    resume: { type: String },
    coverLetter: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const jobApplication = model("jobApplications", jobApplicationSchema);
