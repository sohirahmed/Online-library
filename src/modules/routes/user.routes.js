import express from 'express';
import { signIn, signUp } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/signUp', signUp);
userRouter.post('/signIn', signIn);

export default userRouter;
