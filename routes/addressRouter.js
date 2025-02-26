import { Router } from 'express';
import AddressRouter from '../models/AddressModel.js';
import {getAll, getOneById, createOne, updateOne, deleteOne} from '../controllers/crudFactory.js';


    const addressRouter = Router();
    

    addressRouter.get('/', getAll(AddressRouter));
    addressRouter.get('/:id', getOneById(AddressRouter));
    addressRouter.post('/', createOne(AddressRouter));
    addressRouter.put('/:id', updateOne(AddressRouter));
    addressRouter.delete('/:id', deleteOne(AddressRouter));


export default addressRouter;