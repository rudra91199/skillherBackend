import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: {
        values: ["admin", "learner", "mentor", "employer"],
        message: "{VALUE} is not a valid role",
      },
      required: true,
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "courses" }],
    stories: [{ type: Schema.Types.ObjectId, ref: "stories" }],
    bookings: [{ type: Schema.Types.ObjectId, ref: "bookings" }],
    jobs: [{ type: Schema.Types.ObjectId, ref: "jobs" }],
    applications: [{ type: Schema.Types.ObjectId, ref: "jobApplications" }],
  },
  { timestamps: true }
);

export const User = model("users", userSchema);
