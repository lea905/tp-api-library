import { CustomError } from "../middlewares/errorHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

type Role = "admin" | "gerant" | "user";

interface Permissions {
    [key: string]: {
        author: string[];
        book: string[];
        bookCopy: string[];
    };
}

const permissions: Permissions = {
    admin: {
        author: ["read", "create", "update", "delete"],
        book: ["read", "create", "update", "delete"],
        bookCopy: ["read", "create", "update", "delete"],
    },
    gerant: {
        author: ["read", "create", "update"],
        book: ["read", "create", "update"],
        bookCopy: ["read", "create", "update", "delete"],
    },
    user: {
        author: ["read"],
        book: ["read", "create"],
        bookCopy: ["read"],
    },
};

export class AuthentificationService {
    public async authenticate(username: string, password: string): Promise<string> {
        const user = await User.findOne({ where: { username, password } });

        if (!user) {
            let error: CustomError = new Error("Invalid username or password");
            error.status = 401;
            throw error;
        }

        let role: Role = "user";
        if (user.username === "root") role = "admin";
        else if (user.username === "gerant") role = "gerant";

        const token = jwt.sign(
            {
                username: user.username,
                role,
                permissions: permissions[role],
            },
            "your_secret_key",
            { expiresIn: "1h" }
        );

        return token;
    }
}

export const authentificationService = new AuthentificationService();