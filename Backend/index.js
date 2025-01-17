import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './Routes/userRoutes.js';

dotenv.config();

const app = express();
const port = 4000;
app.use(cors());

app.use(express.json());
app.use('/api/user', userRoutes);

const dbURI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(`Error connecting to MongoDB `);
    }
};

// Connect to MongoDB
connectDB();


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});