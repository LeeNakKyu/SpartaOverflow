import { CustomError } from "../middlewares/error.middleware.js";
import { QuestionsRepository } from "../repositories/questions.repository.js";


export class QuestionsService {
    questionsRepository = new QuestionsRepository();

    // 질문 생성
    createQuestion = async (title, questionDetail, userId) => {
        try {
            const createdQuestion = await this.questionsRepository.createOne(title, questionDetail, userId);

            return {
                title: createdQuestion.title,
                questionDetail: createdQuestion.questionDetail,
                userId: createdQuestion.userId,
            };
        } catch(error){
            console.log(error);
            next(error);
        }

        
        // 질문 리스트 조회
        getQuestions = async () => {
            const questions = await this.questionsRepository.getQustions();

            questions.sort((a, b) => {
                return b.createAt - a.createAt
            })

            return questions.map((question) => {
                return {
                    title: question.title,
                    createAt: question.createAt,
                };
            });
        }


        // 질문 수정
        updateQuestion = async (questionId, title, questionDetail) => {
            const question = await this.questionsRepository.findQuestionById(questionId);
            if(!question) throw new CustomError('질문이 존재하지 않습니다.', 404);

            await this.questionsRepository.updateQuestion(questionId, title, questionDetail);

            const updatedQuestion = await this.questionsRepository.findQuestionById(questionId);

            return {
                questionId: updatedQuestion.questionId,
                title: updatedQuestion.title,
                questionDetail: updatedQuestion.questionDetail,
            };
        };


        // 질문 삭제 
        deleteQuestion = async (questionId) => {
            const question = await this.questionsRepository.findQuestionById(questionId);
    
            if (!question) throw new CustomError('질문이 존재하지 않습니다.', 404);
    
            await this.questionsRepository.deleteQuestion(questionId);
    
            return {
                questionId: question.questionId,
                title: question.title,
                questionDetail: question.questionDetail,
            }
        }
    }
}