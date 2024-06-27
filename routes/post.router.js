import express from 'express';
import postsService from '../services/PostsService.js';

const router = express.Router();

router.get('', async (req, res) => {
    const { status, data } = await postsService.getAllPosts();
    res.status(status).json(data);
});

router.get('/:postId', async (req, res) => {
    console.log(req.user)
    const { status, data } = await postsService.getPostById(req.user._id.toString(),req.params.postId);
    res.status(status).json(data);
});

router.post('', async (req, res) => {
    console.log(req.user._id.toString())
    const { status, data } = await postsService.createPost({
        authorId: req.user._id.toString(),
        title: req.body.title,
        body: req.body.body,
    });
    res.status(status).json(data);
});

router.get('/user/:userId', async (req, res) => {
    const { status, data } = await postsService.getPostsByUserId(req.params.userId);
    res.status(status).json(data);
});

router.delete('/delete/:postId', async (req, res) => {
    console.log(req.params.postId)
    const { status, data } = await postsService.deletePostById(req.params.postId);
    res.status(status).json(data);
});

router.post('/:postId/comment', async (req, res) => {
    try {
        //console.log(...req.body)
        const { status, data } = await postsService.addCommentToPost(req.params.postId, { ...req.body, authorId: req.user._id });
        res.status(status).json(data);
    } catch (error) {
      console.error('Error adding comment:', error.message);
      res.status(500).json({ error: error.message });
    }
});

router.post('/:postId/comment', async (req, res) => {
    try {
        //console.log(...req.body)
        const { status, data } = await postsService.addCommentToPost(req.params.postId, { ...req.body, authorId: req.user._id });
        res.status(status).json(data);
    } catch (error) {
      console.error('Error adding comment:', error.message);
      res.status(500).json({ error: error.message });
    }
});

router.post('/:postId/like', async (req, res) => {
    try {
        const { status, data } = await postsService.addLikeToPost(req.params.postId, req.user._id.toString());
        res.status(status).json(data);
    } catch (error) {
      console.error('Error adding comment:', error.message);
      res.status(500).json({ error: error.message });
    }
});

router.put('/:postId', async (req, res) => {
    const { title, body } = req.body;
    try {
        const { status, data } = await postsService.updatePostById(req.params.postId, req.user._id, title, body );
        res.status(status).json(data);
    } catch (error) {
      console.error('Error adding comment:', error.message);
      res.status(500).json({ error: error.message });
    }
});

export default router;