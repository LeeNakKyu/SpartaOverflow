import { Router } from 'express';
import auth from '../middlewares/need-signin.middleware.js';
import { QuestionsController } from '../controllers/questions.controller.js';

const questionsController = new QuestionsController();

const questionsRouter = Router();


// 질문 생성
questionsRouter.post('/', auth, questionsController.createQuestion);

// 질문 리스트 보기 
questionsRouter.get('/', auth, questionsController.getQuestions);

// 질문 수정
questionsRouter.put('/:questionId', auth, questionsController.updateQuestion);

// 질문 삭제
questionsRouter.delete('/:questionId', auth, questionsController.deleteQuestion);

export { questionsRouter };