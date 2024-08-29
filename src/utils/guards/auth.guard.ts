import {
    ExecutionContext,
    createParamDecorator
} from "@nestjs/common";
import { log } from "console";

export interface UserResponseToken {
    id: string;
    email: string;
}

export const GetUserIdFromToken = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserResponseToken = request.user;
    return data ? user?.[data] : user;
});