import { model, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "users" },
    mentor: { type: Schema.Types.ObjectId, ref: "mentors" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
      //date, string, topic
    },
    date: { type: String, required: true },
    topic: { type: String, required: true },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Booking = model("bookings", bookingSchema);
