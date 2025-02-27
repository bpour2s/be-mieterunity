import { Router } from 'express';
import CategoryModel from '../models/CategoryModel.js';
import {getAll, getOneById, createOne, updateOne, deleteOne} from '../controllers/crudFactory.js';


    const categoryRouter = Router();
    

    categoryRouter.get('/', getAll(CategoryModel));
    categoryRouter.get('/:id', getOneById(CategoryModel));
    categoryRouter.post('/', createOne(CategoryModel));
    categoryRouter.put('/:id', updateOne(CategoryModel));
    categoryRouter.delete('/:id', deleteOne(CategoryModel));


export default categoryRouter;