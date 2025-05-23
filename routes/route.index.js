import { Router } from "express";
import { MentorRoute } from "../modules/mentor/mentor.route.js";
import { JobRoute } from "../modules/job/job.route.js";
import { CourseRoute } from "../modules/course/course.route.js";
import { StoryRoute } from "../modules/stories/stories.route.js";
import { AuthRoute } from "../modules/user/auth.route.js";

const router = Router();

const moduleRoutes = [
  {
    path: "/courses",
    route: CourseRoute,
  },
  {
    path: "/mentors",
    route: MentorRoute,
  },
  {
    path: "/jobs",
    route: JobRoute,
  },
  {
    path: "/stories",
    route: StoryRoute,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
