import express from "express";
import Registration from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", Registration);

export default router;
