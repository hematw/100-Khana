import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profile";

const profileRouter = Router();

profileRouter.put("/update", updateProfile);
profileRouter.get("/:id", getProfile);

export default profileRouter;
