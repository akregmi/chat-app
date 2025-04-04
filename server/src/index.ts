import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import messageRoute from './routes/messageRoute'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoute)
app.use('/conversation/', messageRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});