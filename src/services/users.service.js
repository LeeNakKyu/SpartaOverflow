import { CustomError } from '../middlewares/error.middleware.js';
import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';

export class UsersService {
    usersRepository = new UsersRepository();

    // 회원 가입
    signup = async (email, password, type) => {

        const salt = process.env.HASH_SALT_ROUNDS;
        const bcryptPassword = bcrypt.hashSync(password, +salt);

        const newUser = await this.usersRepository.signup(
            email,
            bcryptPassword,
            type,
        );
        return {
            userId: newUser.userId,
            email: newUser.email,
            type: newUser.type,
        };
    };

    // 로그인
    signIn = async (req, email, password, next) => {
        const user = await this.usersRepository.findUserByEmail(email);

        if(!user){
            throw new CustomError('존재하는 이메일이 없습니다.', 401);
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if(!isPasswordCorrect){
            throw new CustomError('비밀번호가 일치하지 않습니다.', 403);
        }

        req.session.userId = user.userId;

        return {
            userId: user.userId,
            password: user.password,
            type: user.type,
        };
    };


    
}