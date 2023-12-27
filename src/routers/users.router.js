import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import auth from '../middlewares/need-signin.middleware.js';

//import auth from '../middlewares/need-signin.middleware.js';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/signup', usersController.signUp);
usersRouter.post('/signin', usersController.signIn);

export { usersRouter };
