import express from "express";
import { adminAddQues } from "../controllers/adminController.js";
import { createAdmin } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router=express.Router();


router.post("/addques",adminAddQues);
router.post("/create", protect, admin, createAdmin);

export default router;