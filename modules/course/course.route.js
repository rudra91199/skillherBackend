import { Router } from "express";
import { CourseController } from "./course.controller.js";

const router = Router();

router.post("/create/:id", CourseController.createCourse);

router.patch("/update/:id", CourseController.editCourse);

router.get("/all", CourseController.getAllCourses);

router.get("/:id", CourseController.getSingleCourse);

router.patch("/enroll/:userId", CourseController.courseEnrollment);

router.delete("/delete/:id", CourseController.handleDeleteCourse);

export const CourseRoute = router;
