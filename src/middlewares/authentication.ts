import * as express from "express";
import * as jwt from "jsonwebtoken";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "jwt") {
        const token = request.headers["authorization"]?.split(" ")[1];

        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error("No token provided"));
            } else {
                jwt.verify(token, "your_secret_key", (error, decoded: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (scopes && scopes.length > 0) {
                            for (let scope of scopes) {
                                const [table, action] = scope.split(":");
                                if (
                                    !decoded.permissions[table] ||
                                    !decoded.permissions[table].includes(action)
                                ) {
                                    return reject(new Error("Forbidden - insufficient rights"));
                                }
                            }
                        }
                        resolve(decoded);
                    }
                });
            }
        });
    } else {
        throw new Error("Only JWT authentication is supported");
    }
}
