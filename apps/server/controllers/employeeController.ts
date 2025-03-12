import { Request, Response } from "express";
import mongoose = require("mongoose");
import Employee from "../models/Employee";

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    // Validar los campos obligatorios
    const requiredFields = ["name", "lastName", "position", "birthDate"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        console.error(`Missing required field: ${field}`);
        return res.status(400).json({
          message: `Missing required field: ${field}`,
        });
      }
    }

    // Validar formato de fecha
    const birthDate = new Date(req.body.birthDate);
    if (isNaN(birthDate.getTime())) {
      console.error("Invalid date format:", req.body.birthDate);
      return res.status(400).json({
        message: "Invalid date format for birthDate",
      });
    }

    const employee = new Employee({
      name: req.body.name,
      lastName: req.body.lastName,
      position: req.body.position,
      birthDate: birthDate,
    });


    const newEmployee = await employee.save()
    res.status(201).json(newEmployee);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(err.errors).map((e) => e.message),
      });
    }

    if (err instanceof mongoose.Error.MongooseServerSelectionError) {
      return res.status(500).json({
        message: "Database connection error",
        error: "Could not connect to the database",
      });
    }

    res.status(500).json({
      message: "Error creating employee",
      error: (err as Error).message,
    });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ message: (err as Error).message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ message: (err as Error).message });
  }
};
