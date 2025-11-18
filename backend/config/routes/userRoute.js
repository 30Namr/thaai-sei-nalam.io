import express from 'express';
import { loginUser, registerUser, adminLogin, forgotPassword, resetPassword ,resetPasswordWithSecurityAnswer} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post("/forgot-password", forgotPassword);
// userRouter.post('/reset-password/:token', resetPassword); namrata

// The route for resetting password via token (from email link)
userRouter.post('/reset-password/:token', resetPassword);

// The new route for resetting password via security question
userRouter.post('/recover-password', resetPasswordWithSecurityAnswer);


export default userRouter;