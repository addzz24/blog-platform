import express from 'express';
import commentsService from '../services/CommentsService.js';


const router = express.Router();

router.get('/:postId', async (req, res) => {
    const { status, data } = await commentsService.getCommentsByPost(req.user._id.toString(),req.params.postId);
    res.status(status).json(data);
});

export default router;