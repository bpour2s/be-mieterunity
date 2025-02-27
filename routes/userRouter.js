import { Router } from 'express';
import UserModel from '../models/UserModel.js';
import { getAll, getOneById, createOne, updateOne, deleteOne } from '../controllers/crudFactory.js';
import { userSignup, userLogin, userLogout } from '../controllers/authControllers.js';

const userRouter = Router();

userRouter.get('/', getAll(UserModel));
userRouter.get('/:id', getOneById(UserModel));
userRouter.post('/', createOne(UserModel));
userRouter.put('/:id', updateOne(UserModel));
userRouter.delete('/:id', deleteOne(UserModel));

userRouter.post('/signup', userSignup);
userRouter.post('/login', userLogin);
userRouter.post('/logout', userLogout);



export default userRouter;
