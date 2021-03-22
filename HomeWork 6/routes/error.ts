import {Router, Request, Response} from 'express';
const router: Router = Router();

router.use((req: Request, res: Response): void => {
    res.statusCode = 404;
    res.json({message: 'Page not found'});
})

export {router as errorRoutes}