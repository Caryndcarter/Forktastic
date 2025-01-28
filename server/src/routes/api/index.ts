import { Router } from 'express';
//import { userRouter } from './user-routes.js'; 
//import { recipeRouter } from './recipe-routes.js';
import askRouter from './askRoutes.js';
//import devRouter from './dev.js';
import searchRouter from './search-routes.js';

const router = Router();

//router.use('/recipes', recipeRouter); 
router.use('/search', searchRouter);
//router.use('/users', userRouter); 
router.use('/ask',askRouter)
//router.use('/dev', devRouter);

export default router;
