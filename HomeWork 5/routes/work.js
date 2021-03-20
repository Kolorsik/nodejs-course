const {Router} = require('express');
const Worker = require('../models/Worker');
const Work = require('../models/Work');
const EmployWorker = require('../models/EmployWorker');
const router = Router();

router.get('/', async (req, res) => {
    const works = await Work.find();
    res.statusCode = 200;
    res.json(works);
})

router.post('/', async (req, res) => {
    const {name, salary, hoursPerDay} = req.body;
    if (name && salary && hoursPerDay && typeof(name) === 'string' && typeof(salary) === 'number' && typeof(hoursPerDay) === 'number') {
        const work = new Work({name, salary, hoursPerDay});
        await work.save();
        res.statusCode = 201;
        res.json({message: 'Work has been created successfully!', work});
    } else {
        res.statusCode = 400;
        res.json({message: 'Incorrent parameters in request'});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const work = await Work.findById(req.params.id);
        if (work) {
            res.statusCode = 200;
            res.json(work);
        } else {
            res.statusCode = 404;
            res.json({message: `Work with id: ${req.params.id} not found`});
        }
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Work with id: ${req.params.id} not found`});
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const {name, salary, hoursPerDay} = req.body;
        const work = await Work.findById(req.params.id);
        if (work && ((name && typeof(name) === 'string') || (salary && typeof(salary) === 'number') || (hoursPerDay && typeof(hoursPerDay) === 'number'))) {
            let update = {};
            if (name) {
                update.name = name;
            }

            if (salary) {
                update.salary = salary;
            }

            if (hoursPerDay) {
                update.hoursPerDay = hoursPerDay;
            }

            await Work.findByIdAndUpdate(req.params.id, update);
            const work = await Work.findById(req.params.id);
            res.statusCode = 200;
            res.json({message: `Work with id: ${req.params.id} has been updated`, work});
        } else {
            if (!work) {
                res.statusCode = 404;
                res.json({message: `Work with id: ${req.params.id} not found`});
            } else {
                res.statusCode = 400;
                res.json({message: 'Incorrent parameter(s) in request'});
            }
        }
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Work with id: ${req.params.id} not found`});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const work = await Work.findById(req.params.id);
        const {name, salary, hoursPerDay} = req.body;
        if (work && name && salary && hoursPerDay && typeof(name) === 'string' && typeof(salary) === 'number' && typeof(hoursPerDay) === 'number') {
            await Work.findByIdAndUpdate(req.params.id, {name, salary, hoursPerDay});
            const work = await Work.findById(req.params.id);
            res.statusCode = 200;
            res.json({message: `Work with id: ${req.params.id} has been updated`, work});
        } else {
            if (!work) {
                res.statusCode = 404;
                res.json({message: `Work with id: ${req.params.id} not found`});
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

router.delete('/:id', async (req, res) => {
    try {
        await Work.findByIdAndDelete(req.params.id);
        res.statusCode = 200;
        res.json({message: `Work with id: ${req.params.id} has been removed`});
    } catch (e) {
        res.statusCode = 404;
        res.json({message: `Work with id: ${req.params.id} not found`});
    }
})

router.get('/:id/workers', async (req, res) => {
    try {
        const work = await Work.findById(req.params.id);
        if (work) {
            const workers = await EmployWorker.find({work: req.params.id}).populate('worker');
            res.json({workers, salary: work.salary, totalSalary: work.salary * workers.length});
        } else {
            res.statusCode = 400;
            res.json({message: `Work with id: ${req.params.id} not found`});
        }
    } catch (e) {
        res.statusCode = 400;
        res.json({message: `Work with id: ${req.params.id} not found`});
    }
})

router.delete('/:idWork/:idWorker', async (req, res) => {
    try {
        const {idWorker, idWork} = req.params;
        const work = await Work.findById(idWork);
        if (work) {
            const EmpWorker = await EmployWorker.findOne({worker: idWorker, work: idWork});
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

module.exports = router;