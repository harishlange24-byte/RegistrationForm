import express from "express";

import {
    createAdmin,
    adminLogin,
    getAllUsers,
    deleteUser
} from "../controllers/admin.controller.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router  = express.Router();

router.post("/create",createAdmin);
router.post("/login",adminLogin);

router.get("/registrations",adminMiddleware,getAllUsers);

router.delete("/registrations/:id",adminMiddleware,deleteUser);

export default router;