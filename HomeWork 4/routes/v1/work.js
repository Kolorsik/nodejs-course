const {Router} = require('express');
const Worker = require('../../models/Worker');
const Work = require('../../models/Work');
const router = Router();

router.get('/', async (req, res) => {
    const works = await Work.findAll();
    res.statusCode = 200;
    res.json(works);
})

router.get('/:id', async (req, res) => {
    const work = await Work.findOne({where: {id: req.params.id}});
    if (work) {
        res.statusCode = 200;
        res.json(work);
    } else {
        res.statusCode = 404;
        res.json({message: `Work with id: ${req.params.id} not found`});
    }
})

router.get('/:id/workers', async (req, res) => {
    const work = await Work.findOne({where: {id: req.params.id}});
    if (work) {
        const workers = await work.getWorkers();
        res.statusCode = 200;
        res.json({workers, salary: work.salary, totalSalary: work.salary * workers.length});
    } else {
        res.statusCode = 400;
        res.json({message: `Work with id: ${req.params.id} not found`});
    }
})

router.delete('/:idWork/:idWorker', async (req, res) => {
    const {idWork, idWorker} = req.params;
    const work = await Work.findOne({where: {id: idWork}});
    if (work) {
        let del;
        const workers = await work.getWorkers();
        for (let worker of workers) {
            if (worker.id == idWorker) {
                del = await worker.EmployWorker.destroy();
            }
        }

        if (del) {
            res.statusCode = 200;
            res.json({message: `Work with id: ${idWork} has been removed from worker with id: ${idWorker}`});
        } else {
            res.statusCode = 404;
            res.json({message: `Work with id: ${idWork} does not have worker with id: ${idWork}`});
        }
    } else {
        res.statusCode = 400;
        res.json({message: `Work with id: ${idWork} not found`});
    }
})

router.post('/', async (req, res) => {
    const {name, salary, hoursPerDay} = req.body;
    if (name && salary && hoursPerDay && typeof(name) === 'string' && typeof(salary) === 'number' && typeof(hoursPerDay) === 'number') {
        const work = await Work.create({name, salary, hoursPerDay});
        res.statusCode = 201;
        res.json({message: 'Work has been created successfully!', work});
    } else {
        res.statusCode = 400;
        res.json({message: 'Incorrent parameters in request'});
    }
})

router.delete('/:id', async (req, res) => {
    const work = await Work.destroy({where: {id: req.params.id}});
    if (work) {
        res.statusCode = 200;
        res.json({message: `Work with id: ${req.params.id} has been removed`});
    } else {
        res.statusCode = 404;
        res.json({message: `Work with id: ${req.params.id} not found`});
    }
})

router.put('/:id', async (req, res) => {
    const {name, salary, hoursPerDay} = req.body;
    const work = await Work.findOne({where: {id: req.params.id}});
    if (work && name && salary && hoursPerDay && typeof(name) === 'string' && typeof(salary) === 'number' && typeof(hoursPerDay) === 'number') {
        await Work.update({name, salary, hoursPerDay}, {where: {id: req.params.id}});
        const work = await Work.findOne({where: {id: req.params.id}});
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
})

router.patch('/:id', async (req, res) => {
    const {name, salary, hoursPerDay} = req.body;
    const work = await Work.findOne({where: {id: req.params.id}});
    if (work && ((name && typeof(name) === 'string') || (salary && typeof(salary) === 'number') || (hoursPerDay && typeof(hoursPerDay) === 'number'))) {
        await Work.update({name, salary, hoursPerDay}, {where: {id: req.params.id}});
        const work = await Work.findOne({where: {id: req.params.id}});
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
})

module.exports = router;