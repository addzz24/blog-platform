import express from 'express';
import connectDB from './configs/db.js';
import userRouter from './routes/user.router.js'; // Assuming you have set up this router

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

