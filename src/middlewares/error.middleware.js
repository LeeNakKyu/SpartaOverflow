export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "CustomError";
        this.statusCode = statusCode;
    }
}

const errorHandling = async (err, req, res, next) => {
    console.log(err);

    if (!err.statusCode) {
        return res.status(500).json({ message: "알 수 없는 에러가 발생하였습니다." });
    }

    return res.status(err.statusCode).json({ message: err.message });
};

export default errorHandling;