import express from 'express';
import usersService from '../services/UsersService.js';


const router = express.Router();

router.post('/register', async (req, res) => {
  const { status, data } = await usersService.registerUser(req.body);
  res.status(status).json(data);
});

router.post('/authenticate', async (req, res) => {
  console.log(req.body.password)
  const { status, data } = await usersService.authenticateUser(req.body.email, req.body.password);
  res.status(status).json(data);
});

export default router;
