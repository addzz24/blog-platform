import { Post } from '../models/posts.schema.js'; 
import { User } from '../models/users.schema.js';
import { Comment } from '../models/comment.schema.js';
class PostsService{
    async createPost({ authorId, title, body }){
        try{
            const user = await User.findById(authorId);
            if (!user) {
                return { status: 404, data: { error: 'Unauthorized request' } };
            }
            const newPost = new Post({
                authorId,
                title,
                body,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            await newPost.save();
            return {
                status: 201,
                data: newPost,
            };
        } catch(error){
            console.log(error)
            return {  
                status: 400, 
                data: { error: 'Error saving post' } 
            };
        }
    };

    async getPostsByUserId(authorId){
        try{
            const user = await User.findById(authorId);
          
            if (!user) {
                return { status: 404, data: { error: 'Unauthorized request' } };
            }
          
            const posts = await Post.find({authorId: authorId.toString()})
            return {
                status: 201,
                data: posts,
            };
        }
        
        catch(error){
            console.log(error)
            return {  
                status: 400, 
                data: { error: 'Error to get posts' } 
            };
        }
    }

    async getAllPosts(){
        try{
            
            const posts = await Post.find()
            return {
                status: 201,
                data: posts,
            };
        }catch(error){
            console.log(error)
            return {  
                status: 400, 
                data: { error: 'Error to get posts' } 
            };
        }
    }

    async deletePostById(postId){
        try{
            console.log(postId)
            const posts = await Post.deleteOne({_id:postId})
            return {
                status: 204,
                data: posts,
            };
        }catch(error){
            console.log(error)
            return {  
                status: 400, 
                data: { error: 'Error to delete post' } 
            };
        }
    }

    async getPostById(authorId , postId){
        try{
            const user = await User.findById(authorId);
          
            if (!user) {
                return { status: 404, data: { error: 'Unauthorized request' } };
            }
          
            const post = await Post.findOne({_id: postId})
            return {
                status: 201,
                data: post,
            };
        }catch(error){
            console.log(error)
            return {  
                status: 400, 
                data: { error: 'Error to get post' } 
            };
        }
    }


    async addCommentToPost(postId, commentData){
        try{
            const user = await User.findById(commentData.authorId);
          
            if (!user) {
                return { status: 404, data: { error: 'Unauthorized request' } };
            }

            const post = await Post.findById(postId);
            if (!post) {
                return { status: 404, data: { error: 'Post not found' } };
            }
          
            const comment = new Comment(commentData);
            post.comments.push(comment);
            await post.save();
          
            return {
                status: 201,
                data: post,
            };
        }catch(error){
            console.log(error)
            return {  
                status: 400, 
                data: { error: 'Error to save post comment' } 
            };
        }
    }

    async addLikeToPost(postId, authorId){
        try{
            const user = await User.findById(authorId);
          
            if (!user) {
                return { status: 404, data: { error: 'Unauthorized request' } };
            }

            const post = await Post.findById(postId);
            if (!post) {
                return { status: 404, data: { error: 'Post not found' } };
            }

            if (post.likes.includes(authorId)) {
                return { status: 400, data: { error: 'User has already liked this post' } };
            }
          
            post.likes.push(authorId);
            await post.save();
          
            return {
                status: 201,
                data: post,
            };
        }catch(error){
            console.log(error)
            return {  
                status: 400, 
                data: { error: 'Error to save post like' } 
            };
        }
    }

    async updatePostById(postId,authorId,title,body){
        try{
            const user = await User.findById(authorId);
          
            if (!user) {
                return { status: 404, data: { error: 'Unauthorized request' } };
            }
          
            const post = await Post.findOne({_id: postId})
            if (title){
                post.title = title;
            }
            if (body){
                post.body = body;
            }

            if(title || body){
                post.updatedAt = new Date();
            }
            return {
                status: 201,
                data: post,
            };
        }catch(error){
            console.log(error)
            return {  
                status: 400, 
                data: { error: 'Error to get post' } 
            };
        }
    }
}
  
export default new PostsService();