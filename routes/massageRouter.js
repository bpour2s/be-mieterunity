import { Router } from 'express';
import MassageModel from '../models/MassageModel.js';
import {getAll, getOneById, createOne, updateOne, deleteOne} from '../controllers/crudFactory.js';


    const massageRouter = Router();
    

    massageRouter.get('/', getAll(MassageModel));
    massageRouter.get('/:id', getOneById(MassageModel));
    massageRouter.post('/', createOne(MassageModel));
    massageRouter.put('/:id', updateOne(MassageModel));
    massageRouter.delete('/:id', deleteOne(MassageModel));


export default massageRouter;