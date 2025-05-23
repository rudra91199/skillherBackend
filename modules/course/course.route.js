import { Router } from "express";
import { CourseController } from "./course.controller.js";

const router = Router();

router.post("/create", CourseController.createCourse);

router.get("/all", CourseController.getAllCourses);

router.get("/:id", CourseController.getSingleCourse);

router.patch("/enroll/:userId", CourseController.courseEnrollment);

export const CourseRoute = router;
