

import { User } from '../models/users.schema.js';
import { Post } from '../models/posts.schema.js'; 
class CommentService{
    async getCommentsByPost(authorId, postId){
        try{
            const user = await User.findById(authorId);
          
            if (!user) {
                return { status: 404, data: { error: 'Unauthorized request' } };
            }
          
            const post = await Post.findById(postId)
            if (!post) {
                return { status: 404, data: { error: 'Post not found' } };
            }
            const comments = await Post.findById(postId);
            return {
                status: 201,
                data: comments.comments,
            };
        }
        
        catch(error){
            console.log(error)
            return {  
                status: 400, 
                data: { error: 'Error getting post comments' } 
            };
        }
    };


}
  
export default new CommentService();