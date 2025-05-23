import { model, Schema } from "mongoose";
const mentorSchema = new Schema(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "users" },
    title: { type: String, required: true },
    company: { type: String, required: true },
    bio: { type: String, required: true },
    expertise: [{ type: String, required: true }],
    image: { type: String, required: true },
    availability: [
      {
        day: { type: String, required: true },
        slots: [{ type: String, required: true }],
      },
    ],
    bookings: [{ type: Schema.Types.ObjectId, ref: "bookings" }],
  },
  { timestamps: true }
);

export const Mentor = model("mentors", mentorSchema);
