// 잘 모르겠습니다
import { prisma } from '../utils/prisma/index.js';
import { CustomError } from './error.middleware.js';


export default async function (req, res, next) {
    try {
        console.log("세션 아이디 확인", req.session)
        const { userId } = req.session;
        console.log("유저 아이디 확인", userId)
        if (!userId) throw new CustomError('로그인이 필요합니다.', 403);

        const user = await prisma.users.findFirst({
            where: { userId: +userId },
        });

        if (!user) throw new CustomError('탈퇴한 회원 입니다.', 403);

        delete user.password;
        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
}