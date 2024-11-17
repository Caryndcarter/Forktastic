import { Router } from 'express';
import { userRouter } from './user-routes.js'; 
import { recipeRouter } from './recipe-routes.js'; 
import searchRouter from './search-routes.js';

const router = Router();

router.use('/recipes', recipeRouter); 
router.use('/search', searchRouter);
router.use('/users', userRouter); 

export default router;
