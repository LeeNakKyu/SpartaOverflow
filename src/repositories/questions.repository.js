import { prisma } from '../utils/prisma/index.js';


export class QuestionsRepository {
    // 질문 생성
    createOne = async (title, questionDetail, userId) => {
        try {
            const createQuestion = await prisma.questions.create({
                data: {
                    userId,
                    title,
                    questionDetail,
                },
            });

            return createQuestion;
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    // 질문 리스트 조회
    getQustions = async() => {
        const questions = await prisma.questions.findMany();

        return questions;
    };


    // 질문 수정, 삭제 (questionId 찾기)
    findQuestionById = async (questionId) => {
        const question = await prisma.questions.findUnique({
            where: {questionId: +questionId},
        });

        return question;
    }

    // 질문 수정 
    updateQuestion = async(questionId, title, questionDetail) => {
        const question = await prisma.question.update({
            where: {questionId: +questionId},
            data: {
                title,
                questionDetail,
            },
        });
        return question;
    };



    // 질문 삭제
    deleteQuestion = async (questionId) => {
        const question = await prisma.questions.delete({
          where: { questionId: +questionId },
        });
    
        return question;
      };
}