import { UsersService } from "../services/users.service.js";
import { CustomError } from "../middlewares/error.middleware.js"

export class UsersController {
    usersService = new UsersService();

    // 회원 가입
    signUp = async (req, res, next) => {
        try {
            const { email, password, confirmPassword, type } = req.body;

            console.log("이메일 확인", email)
            console.log("비밀번호 확인", password)

            if (!email) {
                throw new CustomError('이메일을 적어주세요', 400);
            }

            if (!password) {
                throw new CustomError('비밀번호를 적어주세요', 400);
            }

            if (!confirmPassword) {
                throw new CustomError('비밀번호 확인을 적어주세요', 400);
            }

            if (!type) {
                throw new CustomError('타입을 적어주세요', 400);
            }

            if (password !== confirmPassword) {
                throw new CustomError('비밀번호가 일치하지 않습니다.', 400);
            }

            const newUser = await this.usersService.signup(
                email,
                password,
                type,
            );

            return res.status(201).json({
                message: '성공적으로 가입 되었습니다.',
                data: {
                    userId: newUser.userId,
                    password: newUser.password,
                    type: newUser.type,
                }
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    // 로그인
    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email) {
                throw new CustomError('이메일을 입력해주세요', 400);
            }

            if (!password) {
                throw new CustomError('비밀번호를 입력해주세요', 400);
            }

            const user = await this.usersService.signIn(req, email, password);

            return res.status(201).json({
                message: '로그인 성공',
                data: {
                    userId: user.userId,
                    email: user.email,
                    type: user.type,
                },
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    };
}