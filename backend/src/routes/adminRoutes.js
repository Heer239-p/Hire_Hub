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
    deleteJob as deleteJobAdmin,
} from "../controllers/adminController.js";
import { getAllCompanies, getCompanyById } from "../controllers/admin/companyController.js";
import { getAllApplications } from "../controllers/adminController.js";
import { getAllPayments } from "../controllers/adminController.js";

const router = express.Router();


router.post("/users",  getAllUsers);

router.post("/users/get/:id", protect, authorizeRoles("admin","user"), getUserById);

router.post("/users/update/:id", protect, authorizeRoles("admin"), updateUser);

router.post("/users/delete/:id", protect, authorizeRoles("admin"), deleteUser);


router.post("/jobs", protect, authorizeRoles("admin"), getAllJobs);

router.post("/jobs/get/:id", protect, authorizeRoles("admin"), getJobById);

router.post("/jobs/update/:id", protect, authorizeRoles("admin"), updateJob);

router.post("/jobs/delete/:id", protect, authorizeRoles("admin"), deleteJobAdmin);


// GET all companies
router.get("/companies", getAllCompanies);

// GET company by ID
router.get("/companies/:id", getCompanyById);


router.post("/applications", protect, authorizeRoles("admin"), getAllApplications);

router.get("/payments", protect, authorizeRoles("admin"), getAllPayments);





export default router;