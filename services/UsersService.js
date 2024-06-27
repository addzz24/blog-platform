import { User } from '../models/users.schema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
process.env.JWT_SECRET = 'anc';
class UsersService {

  async registerUser(userData) {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return {
        status: 201,
        data: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          createdAt: newUser.createdAt,
          profileInfo: newUser.profileInfo,
        },
      };
    } catch (error) {
      if (error.code === 11000) {
        return {
          status: 400,
          data: { error: 'A user with the given username or email already exists.' },
        };
      }

        console.error('Error saving user:', error);
        return {  
                status: 400, 
                data: { error: 'Error registering user' } 
          };
    }
  }

  async authenticateUser(email, password) {
    
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        return { status: 404, data: { error: 'User not found' } };
      }
      console.log('pass',user.password ,'===', 'userpass', password)
      const isMatch = await bcrypt.compare(password,user.password)
      if (!isMatch) {
        return { status: 401, data: { error: 'Invalid password' } };
      }
  
      const token = jwt.sign({ _id: user._id.toString(), email: user.email }, process.env.JWT_SECRET);
      return {
        status: 200,
        data: {
          jwtToken: token
        },
      };
    } catch (error) {
      console.error(error.message);
      return { status: 500, data: { error: 'An error occurred during authentication' } };
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        return { status: 404, data: { error: 'User not found' } };
      }

      return {
        status: 200,
        data: {
          user: user
        },
      };

    } catch (error) {
      console.error('Error saving user:', error);
        return {  status: 400, 
                data: { error: 'Error getting the user' } 
        };
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await User.findOne({ username });
      
      if (!user) {
        return { status: 404, data: { error: 'User not found' } };
      }

      return {
        status: 200,
        data: {
          user: user
        },
      };

    } catch (error) {
      console.error('Error saving user:', error);
        return {  status: 400, 
                data: { error: 'Error getting the user' } 
        };
    }
  }
}

export default new UsersService();

