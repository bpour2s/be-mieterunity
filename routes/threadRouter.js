import { Router } from 'express';
import ThreadMOdel from '../models/ThreadModel.js';
import {getAll, getOneById, createOne, updateOne, deleteOne} from '../controllers/crudFactory.js';


    const threadRouter = Router();
    

    threadRouter.get('/', getAll(ThreadMOdel));
    threadRouter.get('/:id', getOneById(ThreadMOdel));
    threadRouter.post('/', createOne(ThreadMOdel));
    threadRouter.put('/:id', updateOne(ThreadMOdel));
    threadRouter.delete('/:id', deleteOne(ThreadMOdel));


export default threadRouter;