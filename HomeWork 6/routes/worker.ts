import {Router, Request, Response} from 'express';
import IWorker from '../interfaces/IWorker';
import IEmployWorker from '../interfaces/IEmployWorker';
import EmployWorker from '../models/EmployWorker';
import Worker from '../models/Worker';
import Work from '../models/Work';
import IWork from '../interfaces/IWork';
const router: Router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    const workers: IWorker[] = await Worker.find();
    res.statusCode = 200;
    res.json(workers);
})

router.post('/', async (req: Request, res: Response): Promise<void> => {
    const addWorker: IWorker = req.body;
    try {
        if (addWorker.name && typeof(addWorker.name) === 'string') {
            const worker: IWorker = new Worker(addWorker);
            await worker.save();
            res.statusCode = 201;
            res.json({message: 'Worker has been created successfully!', worker});
        } else {
            res.statusCode = 400;
            res.json({message: 'Incorrent parameters in request'});
        }
    } catch (e) {
        res.statusCode = 400;
        res.json({message: 'Incorrent parameters in request'});
    }
})

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const idWorker: String = req.params.id;
    try {
        const worker: IWorker | null = await Worker.findById(idWorker);
        if (worker) {
            res.statusCode = 200;
            res.json(worker);
        } else {
            res.statusCode = 404;
            res.json({message: `Worker with id: ${idWorker} not found`});
        }
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${idWorker} not found`});
    }
})

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    const idWorker: String = req.params.id;
    const updateWorker: IWorker = req.body;
    try {
        if (updateWorker.name && typeof(updateWorker.name) === 'string') {
            await Worker.findByIdAndUpdate(idWorker, updateWorker);
            const worker: IWorker | null = await Worker.findById(idWorker);
            if (worker) {
                res.statusCode = 200;
                res.json({message: `Worker with id: ${idWorker} has been updated`, worker});
            } else {
                res.statusCode = 400;
                res.json({message: 'Incorrent parameter(s) in request'});
            }
        } else {
            res.statusCode = 400;
            res.json({message: 'Incorrent parameter(s) in request'});
        }
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${idWorker} not found`});
    }
})

router.patch('/:id', async (req: Request, res: Response): Promise<void> => {
    const idWorker: String = req.params.id;
    const updateWorker: IWorker = req.body;
    try {
        if (updateWorker.name && typeof(updateWorker.name) === 'string') {
            await Worker.findByIdAndUpdate(idWorker, updateWorker);
            const worker: IWorker | null = await Worker.findById(idWorker);
            if (worker) {
                res.statusCode = 200;
                res.json({message: `Worker with id: ${idWorker} has been updated`, worker});
            } else {
                res.statusCode = 400;
                res.json({message: 'Incorrent parameter(s) in request'});
            }
        } else {
            res.statusCode = 400;
            res.json({message: 'Incorrent parameter(s) in request'});
        }
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${idWorker} not found`});
    }
})

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const idWorker: String = req.params.id;
    try {
        await Worker.findByIdAndDelete(idWorker);
        res.statusCode = 200;
        res.json({message: `Worker with id: ${idWorker} has been removed`});
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${idWorker} not found`});
    }
})

router.get('/:id/works', async (req: Request, res: Response): Promise<void> => {
    const idWorker: String = req.params.id;
    try {
        const worker: IWorker | null = await Worker.findById(idWorker);
        if (worker) {
            let totalSalary: number = 0;
            const works: IEmployWorker[] = await EmployWorker.find({worker: idWorker}).populate('work');
            for (let work of works) {
                const temp: IWork = <IWork>work.work;
                totalSalary += +temp.salary;
            }
            res.json({works, totalSalary});
        } else {
            res.statusCode = 400;
            res.json({message: `Worker with id: ${idWorker} not found`});
        }
    } catch (e) {
        res.statusCode = 400;
        res.json({message: `Worker with id: ${idWorker} not found`});
    }
})

router.post('/:idWorker/:idWork', async (req: Request, res: Response): Promise<void> => {
    const idWorker: String = req.params.idWorker;
    const idWork: String = req.params.idWork;
    try {
        const work: IWork | null = await Work.findById(idWork);
        const worker: IWorker | null = await Worker.findById(idWorker);
        if (work && worker) {
            let hours: number = 0;
            const works: IEmployWorker[] = await EmployWorker.find({worker: worker._id}).populate('work');

            for (let work of works) {
                const temp: IWork = <IWork>work.work;
                hours += +temp.hoursPerDay;
            }

            if ((hours + +work.hoursPerDay) <= 20) {
                const EmpWorker: IEmployWorker | null = await EmployWorker.findOne({worker: worker._id, work: work._id});
                if (!EmpWorker) {
                    const employWorker: IEmployWorker = new EmployWorker({worker: worker._id, work: work._id});
                    employWorker.save();
                    res.statusCode = 200;
                    res.json({message: `Work with id: ${idWork} added to workers with id: ${idWorker}`});
                } else {
                    res.statusCode = 400;
                    res.json({message: `Worker with id: ${idWorker} already have work with id: ${idWork}`});
                }
            } else {
                res.statusCode = 200;
                res.json({message: `Worker with id: ${idWorker} works a lot. He wants to get some rest ༼ つ ◕_◕ ༽つ`})
            }
        } else {
            if (!worker) {
                res.statusCode = 400;
                res.json({message: `Worker with id: ${idWorker} not found`});
            }

            if (!work) {
                res.statusCode = 400;
                res.json({message: `Work with id: ${idWork} not found`});
            }
        }
    } catch (e) {
        res.statusCode = 400;
        res.json({message: 'Incorrent parameter(s) in request'});
    }
})

router.delete('/:idWorker/:idWork', async (req: Request, res: Response): Promise<void> => {
    const idWorker: String = req.params.idWorker;
    const idWork: String = req.params.idWork;
    try {
        const worker: IWorker | null = await Worker.findById(idWorker);
        if (worker) {
            const EmpWorker: IEmployWorker | null = await EmployWorker.findOne({worker: idWorker, work: idWork});
            if (EmpWorker) {
                await EmployWorker.findByIdAndDelete(EmpWorker._id);
                res.statusCode = 200;
                res.json({message: `Work with id: ${idWork} has been removed from worker with id: ${idWorker}`});
            } else {
                res.statusCode = 404;
                res.json({message: `Worker with id: ${idWorker} does not have work with id: ${idWork}`});
            }
        } else {
            res.statusCode = 404;
            res.json({message: `Worker with id: ${idWorker} not found`});
        }
    } catch (e) {
        res.statusCode = 400;
        res.json({message: 'Incorrent parameter(s) in request'});
    }
})

export {router as workerRoutes}