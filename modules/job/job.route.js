import { Router } from "express";
import { jobController } from "./jobs.controller.js";

const router = Router();

router.get("/all", jobController.getAllJobs);

router.post("/create", jobController.createJob);

router.get("/:id", jobController.getSingleJob);

router.get("/employer/:id", jobController.getJobsByEmployer);

router.post("/apply", jobController.createJobApplication);

router.get("/applications/:id", jobController.getApplications);

router.patch(
  "/applications/statusUpdate/:id",
  jobController.handleApplicationStatusChange
);

router.patch("/updateStatus/:id", jobController.handleJobActivityStatusChange);

export const JobRoute = router;
