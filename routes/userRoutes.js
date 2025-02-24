import {Router} from 'express';
import User from '../schemas/User.js';

export const userRouter = Router();

userRouter.post('/', async(req,res,next) => {

    const { email} = req.body;

    try {
        const user = await User.create({email});

        res.status(201).json({User});
    } catch (error) {
        next(error);
        
    }
})

export default userRouter;
