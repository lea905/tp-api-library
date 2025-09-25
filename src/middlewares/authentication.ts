import * as express from "express";
import * as jwt from "jsonwebtoken";

let admin =[];
let user = [];
let gerant = [];


export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === 'jwr') {
        const token = request.headers['authorization'];
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error("No token provided"));
            } else {
                jwt.verify(token, "your_secret_key",
                    function (error, decoded) {
                        if (scopes !== undefined) {
                            //Gestion des droits
                        }
                        resolve(decoded);
                    })
            }
        });
    } else {
        throw new Error("Only JWT authentication is supported");
    }
}