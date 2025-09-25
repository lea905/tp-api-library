import {CustomError} from "../middlewares/errorHandler";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model";

export class AuthentificationService {
    public async authenticate(username: string, password: string): Promise<string> {
        const user = await User.findOne({where: {username, password}});

        if (!user) {
            let error: CustomError = new Error("Invalid username or password");
            error.status = 401;
            throw error;
        }
    const token = jwt.sign({username : user.username},"yout_secret_key",{expiresIn: '1h'});
    return token;
    }
}

export const authentificationService = new AuthentificationService();