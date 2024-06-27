import express from 'express';
import connectDB from './configs/db.js';
import userRouter from './routes/user.router.js'; // Assuming you have set up this router
import postRouter from './routes/post.router.js'
import { authenticate } from './middleware/authMiddleware.js';
import commentsRouter from './routes/comment.router.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts',authenticate, postRouter);
app.use('/api/v1/comments',authenticate, commentsRouter);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

