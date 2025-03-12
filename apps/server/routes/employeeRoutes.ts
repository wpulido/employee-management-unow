import express = require("express");
const router = express.Router();
import {getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employeeController";
import authMiddleware from "../middleware/authMiddleware";

router.get("/", authMiddleware, getEmployees);
router.post("/create", authMiddleware, createEmployee);
router.put("/:id", authMiddleware, updateEmployee);
router.delete("/:id", authMiddleware, deleteEmployee);

export default router;
