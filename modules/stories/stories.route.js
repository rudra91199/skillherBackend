import { Router } from "express";
import { StoryController } from "./stories.controller.js";

const router = Router();

router.get("/all", StoryController.getAllStories);

router.post("/create", StoryController.createStory);

router.get("/:id", StoryController.getSingleStory);

export const StoryRoute = router;
