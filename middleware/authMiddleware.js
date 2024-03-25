import jwt from 'jsonwebtoken';
import { User } from '../models/users.schema.js';

export const authenticate = async (req, res, next) => {
  // Safely extract the token from the Authorization header
  const JSW_SECRET = process.env.JWT_SECRET;
  const header = req.header('Authorization');
  if (!header) {
    return res.status(401).send({ error: 'Authentication token is missing.' });
  }

  const token = header.startsWith('Bearer ') ? header.substring(7) : null;
  if (!token) {
    return res.status(401).send({ error: 'Authentication token is malformed.' });
  }

  try {
    const decoded = jwt.verify(token, JSW_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(401).send({ error: 'Unable to find a user matching this token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};
