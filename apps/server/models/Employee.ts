import {Schema, model, Document } from 'mongoose';
import {Employee} from "../types";

interface EmployeeDocument extends Employee, Document {}

const EmployeeSchema = new Schema<EmployeeDocument>({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    }
})

export default model<EmployeeDocument>("Employee", EmployeeSchema);
