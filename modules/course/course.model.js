import { model, Schema } from "mongoose";

const lessonSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
});

const courseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  price: { type: String, required: true },
  lessons: { type: [lessonSchema], required: true },
  enrolledUsers: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      enrollmentDate: { type: Date, default: Date.now },
    },
  ],
});

export const Course = model("courses", courseSchema);
