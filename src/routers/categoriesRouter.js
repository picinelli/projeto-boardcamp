import { Router } from 'express';

import {getCategories, postCategory} from '../controllers/categoriesController.js';
import {validatePostCategory} from '../middlewares/categoriesValidationMiddleware.js'

const categoriesRouter = Router()

categoriesRouter.post('/categories', validatePostCategory, postCategory)
categoriesRouter.get('/categories', getCategories)

export default categoriesRouter;