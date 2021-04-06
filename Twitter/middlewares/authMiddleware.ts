import { Response, NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';

export function authMiddleware() {
    return (req: Request, res: Response, next: NextFunction): void => {
        const {AuthToken} = req.cookies;
        if (AuthToken) {
            const verified = jwt.verify(AuthToken, 'obtgvcdaolmqztrr');
            if (!verified) {
                res.redirect('/');
            }
            req.user = verified;
            next();
        } else {
            res.redirect('/');
        }
    };
}