import { Router } from "express";
import { AuthController } from "./auth.controller.js";

const router = Router();

router.post("/create", AuthController.createUser);

router.get("/check-auth/:email", AuthController.checkAuth);

export const AuthRoute = router;
