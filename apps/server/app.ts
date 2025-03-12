import express = require('express');
import cors = require('cors');
import cookieParser from 'cookie-parser';
import dotenv = require('dotenv');
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import employeeRoutes from './routes/employeeRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

console.log(employeeRoutes);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
