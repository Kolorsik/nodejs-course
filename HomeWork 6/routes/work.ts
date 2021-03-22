import {Router, Request, Response} from 'express';
import Work from '../models/Work';
import IWork from '../interfaces/IWork';
import EmployWorker from '../models/EmployWorker';
import IEmployWorker from '../interfaces/IEmployWorker';
const router: Router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    const works: IWork[] = await Work.find();
    res.statusCode = 200;
    res.json(works);
})

router.post('/', async (req: Request, res: Response): Promise<void> => {
    const addWork: IWork = req.body;
    if (addWork.name && addWork.salary && addWork.hoursPerDay && typeof(addWork.name) === 'string' && typeof(addWork.salary) === 'number' && typeof(addWork.hoursPerDay) === 'number') {
        const work: IWork = new Work(addWork);
        await work.save();
        res.statusCode = 201;
        res.json({message: 'Work has been created successfully!', work});
    } else {
        res.statusCode = 400;
        res.json({message: 'Incorrent parameters in request'});
    }
})

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const idWork: String = req.params.id;
    try {
        const work: IWork | null = await Work.findById(idWork);
        if (work) {
            res.statusCode = 200;
            res.json(work);
        } else {
            res.statusCode = 404;
            res.json({message: `Work with id: ${idWork} not found`});
        }
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Work with id: ${idWork} not found`});
    }
})

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    const idWork: String = req.params.id;
    try {
        const work: IWork | null = await Work.findById(idWork);
        const updateWork: IWork = req.body;
        if (work && updateWork.name && updateWork.salary && updateWork.hoursPerDay && typeof(updateWork.name) === 'string' && typeof(updateWork.salary) === 'number' && typeof(updateWork.hoursPerDay) === 'number') {
            await Work.findByIdAndUpdate(idWork, updateWork);
            const work: IWork | null = await Work.findById(req.params.id);
            if (work) {
                res.statusCode = 200;
                res.json({message: `Work with id: ${idWork} has been updated`, work});
            } else {
                res.statusCode = 404;
                res.json({message: `Work with id: ${idWork} not found`});
            }
        } else {
            if (!work) {
                res.statusCode = 404;
                res.json({message: `Work with id: ${idWork} not found`});
            } else {
                res.statusCode = 400;
                res.json({message: 'Incorrent parameter(s) in request'});
            }
        }
    } catch (e) {
        res.statusCode = 400;
        res.json({message: 'Incorrent parameters in request'});
    }
})

router.patch('/:id', async (req: Request, res: Response): Promise<void> => {
    const idWork: String = req.params.id;
    try {
        const updateWork: IWork = req.body;
        const work: IWork | null = await Work.findById(idWork);
        if (work && ((updateWork.name && typeof(updateWork.name) === 'string') || (updateWork.salary && typeof(updateWork.salary) === 'number') || (updateWork.hoursPerDay && typeof(updateWork.hoursPerDay) === 'number'))) {
            await Work.findByIdAndUpdate(idWork, updateWork);
            const work: IWork | null = await Work.findById(idWork);
            if (work) {
                res.statusCode = 200;
                res.json({message: `Work with id: ${idWork} has been updated`, work});
            } else {
                res.statusCode = 404;
                res.json({message: `Work with id: ${idWork} not found`});
            }
        } else {
            if (!work) {
                res.statusCode = 404;
                res.json({message: `Work with id: ${idWork} not found`});
            } else {
                res.statusCode = 400;
                res.json({message: 'Incorrent parameter(s) in request'});
            }
        }
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Work with id: ${idWork} not found`});
    }
})

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const idWork: String = req.params.id;
    try {
        await Work.findByIdAndDelete(idWork);
        res.statusCode = 200;
        res.json({message: `Work with id: ${idWork} has been removed`});
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Work with id: ${idWork} not found`});
    }
})

router.get('/:id/workers', async (req: Request, res: Response): Promise<void> => {
    const idWork: String = req.params.id;
    try {
        const work: IWork | null = await Work.findById(idWork);
        if (work) {
            const workers: IEmployWorker[] = await EmployWorker.find({work: idWork}).populate('worker');
            res.json({workers, salary: work.salary, totalSalary: +work.salary * workers.length});
        } else {
            res.statusCode = 400;
            res.json({message: `Work with id: ${idWork} not found`});
        }
    } catch (e) {
        res.statusCode = 400;
        res.json({message: `Work with id: ${idWork} not found`});
    }
})

router.delete('/:idWork/:idWorker', async (req: Request, res: Response): Promise<void> => {
    const idWorker: String = req.params.idWorker;
    const idWork: String = req.params.idWork;
    try {
        const work: IWork | null = await Work.findById(idWork);
        if (work) {
            const EmpWorker: IEmployWorker | null = await EmployWorker.findOne({worker: idWorker, work: idWork});
            if (EmpWorker) {
                await EmployWorker.findByIdAndDelete(EmpWorker._id);
                res.statusCode = 200;
                res.json({message: `Work with id: ${idWork} has been removed from worker with id: ${idWorker}`});
            } else {
                res.statusCode = 404;
                res.json({message: `Work with id: ${idWorker} does not have worker with id: ${idWork}`});
            }
        } else {
            res.statusCode = 404;
            res.json({message: `Work with id: ${idWorker} not found`});
        }
    } catch (e) {
        res.statusCode = 400;
        res.json({message: 'Incorrent parameter(s) in request'});
    }
})

export {router as workRoutes}