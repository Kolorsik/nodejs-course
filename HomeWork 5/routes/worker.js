const {Router} = require('express');
const router = Router();
const Worker = require('../models/Worker');
const Work = require('../models/Work');
const EmployWorker = require('../models/EmployWorker');

router.get('/', async (req, res) => {
    const workers = await Worker.find();
    res.statusCode = 200;
    res.json(workers);
})

router.post('/', async (req, res) => {
    const {name} = req.body;
    if (name && typeof(name) === 'string') {
        const worker = new Worker({name});
        await worker.save();
        res.statusCode = 201;
        res.json({message: 'Worker has been created successfully!', worker});
    } else {
        res.statusCode = 400;
        res.json({message: 'Incorrent parameters in request'});
    }
})

router.get('/:id/works', async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        if (worker) {
            let totalSalary = 0;
            const works = await EmployWorker.find({worker: req.params.id}).populate('work');
            for (let work of works) {
                totalSalary += work.work.salary;
            }
            res.json({works, totalSalary});
        } else {
            res.statusCode = 400;
            res.json({message: `Worker with id: ${req.params.id} not found`});
        }
    } catch (e) {
        res.statusCode = 400;
        res.json({message: `Worker with id: ${req.params.id} not found`});
    }
})

router.post('/:idWorker/:idWork', async (req, res) => {
    try {
        const {idWorker, idWork} = req.params;
        const work = await Work.findById(idWork);
        const worker = await Worker.findById(idWorker);
        if (work && worker) {
            let hours = 0;
            const works = await EmployWorker.find({worker: worker._id}).populate('work');

            for (let work of works) {
                hours += work.work.hoursPerDay;
            }

            if ((hours + work.hoursPerDay) <= 20) {
                const EmpWorker = await EmployWorker.findOne({worker: worker._id, work: work._id});
                if (!EmpWorker) {
                    const employWorker = new EmployWorker({worker: worker._id, work: work._id});
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

router.delete('/:idWorker/:idWork', async (req, res) => {
    try {
        const {idWorker, idWork} = req.params;
        const worker = await Worker.findById(idWorker);
        if (worker) {
            const EmpWorker = await EmployWorker.findOne({worker: idWorker, work: idWork});
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

router.get('/:id', async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        if (worker) {
            res.statusCode = 200;
            res.json(worker);
        } else {
            res.statusCode = 404;
            res.json({message: `Worker with id: ${req.params.id} not found`});
        }
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${req.params.id} not found`});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {name} = req.body;
        if (name && typeof(name) === 'string') {
            await Worker.findByIdAndUpdate(req.params.id, {name});
            const worker = await Worker.findById(req.params.id);
            res.statusCode = 200;
            res.json({message: `Worker with id: ${req.params.id} has been updated`, worker});
        } else {
            res.statusCode = 400;
            res.json({message: 'Incorrent parameter(s) in request'});
        }
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${req.params.id} not found`});
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const {name} = req.body;
        if (name && typeof(name) === 'string') {
            await Worker.findByIdAndUpdate(req.params.id, {name});
            const worker = await Worker.findById(req.params.id);
            res.statusCode = 200;
            res.json({message: `Worker with id: ${req.params.id} has been updated`, worker});
        } else {
            res.statusCode = 400;
            res.json({message: 'Incorrent parameter(s) in request'});
        }
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${req.params.id} not found`});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Worker.findByIdAndDelete(req.params.id);
        res.statusCode = 200;
        res.json({message: `Worker with id: ${req.params.id} has been removed`});
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${req.params.id} not found`});
    }
})

module.exports = router;