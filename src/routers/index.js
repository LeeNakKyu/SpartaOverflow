import { Router } from "express";
import { usersRouter } from './users.router.js';
import { questionsRouter } from "./questions.router.js";

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/questions', questionsRouter);

export { apiRouter };