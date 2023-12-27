import { CustomError } from "../middlewares/error.middleware.js";
import { QuestionsService } from "../services/question.service.js";

export class QuestionsController {

    questionService = new QuestionsService();
    // 질문 생성
    createQuestion = async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { title, questionDetail } = req.body;

            const createdQuestion = await this.questionService.createQuestion(title, questionDetail, userId);

            res.status(201).json({
                message: '질문이 생성되었습니다.',
                data: {
                    userId: createdQuestion.userId,
                    title: createdQuestion.title,
                    questionDetail: createdQuestion.questionDetail,
                },
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    // 질문 리스트 보기
    getQuestions = async (req, res, next) => {
        try {
            const getQuestions = await this.questionService.getQuestions();

            if (!getQuestions) throw new CustomError('질문이 없습니다.', 400);

            return res.statsu(200).json({
                message: '성공적으로 조회 되었습니다.',
                data: {
                    title: getQuestions.title,
                }
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    // 질문 수정
    updateQuestion = async (req, res, next) => {
        try {
            const { questionId } = req.params;
            const { title, questionDetail } = req.body;
            console.log("수정된 내용 확인",questionDetail)

            if (!questionId) throw new CustomError('존재하지 않는 질문입니다.', 404);

            if (!title) throw new CustomError('제목을 수정해주세요', 400);

            if (!questionDetail) throw new CustomError('내용을 수정해주세요', 400);

            // this.questionService.updateQuestion is not a function
            const updatedQuestion = await this.questionService.updateQuestion(questionId, title, questionDetail);

            res.status(200).json({
                message: '질문이 수정되었습니다.',
                data: updatedQuestion,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    // 질문 삭제
    deleteQuestion = async (req, res, next) => {
        try {
            const { questionId } = req.params;

            if (!questionId) throw new CustomError('존재하지 않는 질문입니다.', 404);

            const deletedQuestion = await this.questionService.deleteQuestion(questionId);

            res.status(200).json({
                message: "성공적으로 삭제 되었습니다.",
                data: deletedQuestion,
            });

        } catch (error) {
            console.log( error);
            next(error);
        }
    }
}