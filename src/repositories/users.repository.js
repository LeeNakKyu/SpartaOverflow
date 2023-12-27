import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
    // 회원 가입
    signup = async (email, password, type) => {
        try {
            const newUser = await prisma.users.create({
                data: {
                    email,
                    password,
                    type,
                },
            });
            return newUser;
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    // 로그인 (이메일 찾기)
    findUserByEmail = async (email) => {
        try {
            const user = await prisma.users.findFirst({
                where: {
                    email,
                },
            });
            return user;
        } catch(error){
            console.log(error);
            next(error);
        }
    };



}