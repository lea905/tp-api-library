import { Controller, Route, Post, Body } from "tsoa";
import { CustomError } from "../middlewares/errorHandler";
import { AuthentificationDto } from "../dto/authentification.dto";
import {authentificationService} from "../services/authentification.service";

@Route("auth")
export class AuthenticationController extends Controller {

    @Post("/")
    public async authenticate(@Body() requestBody: AuthentificationDto) {
        const { grant_type, username, password } = requestBody;

        if(grant_type !== "password") {
            let error: CustomError = new Error("Unsupported grant_type");
            error.status = 400;
            throw error;
        }

        const token = await authentificationService.authenticate(username, password);

        return { token };
    }
}