import { Response, NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';

export function userMiddleware() {
    return (req: Request, res: Response, next: NextFunction): void => {
        const {AuthToken} = req.cookies;
        let verified = null
        if (AuthToken) {
            verified = jwt.verify(AuthToken, 'obtgvcdaolmqztrr');
        }
        req.user = verified;
        next();
    };
}