import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllJobs,
    getJobById,
    updateJob,
} from "../controllers/adminController.js";

const router = express.Router();


router.post("/users", protect, authorizeRoles("admin"), getAllUsers);

router.post("/users/get/:id", protect, authorizeRoles("admin"), getUserById);

router.post("/users/update/:id", protect, authorizeRoles("admin"), updateUser);

router.post("/users/delete/:id", protect, authorizeRoles("admin"), deleteUser);


router.post("/jobs", protect, authorizeRoles("admin"), getAllJobs);

router.post("/jobs/get/:id", protect, authorizeRoles("admin"), getJobById);

router.post("/jobs/update/:id", protect, authorizeRoles("admin"), updateJob);

export default router;
