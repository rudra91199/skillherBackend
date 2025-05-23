import { Router } from "express";
import { MentorController } from "./mentors.controller.js";

const router = Router();

router.get("/all", MentorController.getAllMentors);

router.post("/create", MentorController.createMentor);

router.post("/book", MentorController.bookMentor);

router.get("/:id", MentorController.getSingleMentor);

router.get("/profile/:id", MentorController.getMentorProfile);

router.patch("/booking/updateStatus/:id", MentorController.changeBookingStatus);

export const MentorRoute = router;
