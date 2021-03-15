const {Router} = require('express');
const Worker = require('../../models/Worker');
const Sequalize = require('sequelize');
const sequelize = require('../../database/sequelize');
const Work = require('../../models/Work');
const EmployWorker = require('../../models/EmployWorker');
const momentjs = require('moment');
const router = Router();

router.get('/', async (req, res) => {
    const workers = await Worker.findAll();
    res.statusCode = 200;
    res.json(workers);
})

router.get('/:id', async (req, res) => {
    const worker = await Worker.findOne({where: {id: req.params.id}});
    if (worker) {
        res.statusCode = 200;
        res.json(worker);
    } else {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${req.params.id} not found`});
    }
})

router.delete('/:idWorker/:idWork', async (req, res) => {
    const {idWorker, idWork} = req.params;
    const worker = await Worker.findOne({where: {id: idWorker}});
    if (worker) {
        let del;
        const works = await worker.getWorks();
        for (let work of works) {
            if (work.id == idWork) {
                del = await work.EmployWorker.destroy();
            }
        }
        if (del) {
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
})

router.get('/:id/works', async (req, res) => {
    const worker = await Worker.findOne({where: {id: req.params.id}});
    if (worker) {
        let salary = 0;
        const works = await worker.getWorks();
        for (let work of works) {
            salary += work.salary;
        }
        res.statusCode = 200;
        res.json({works, totalSalary: salary});
    } else {
        res.statusCode = 400;
        res.json({message: `Worker with id: ${req.params.id} not found`})
    }
})

router.post('/:idWorker/:idWork', async (req, res) => {
    const {idWorker, idWork} = req.params;
    const work = await Work.findOne({where: {id: idWork}});
    const worker = await Worker.findOne({where: {id: idWorker}});
    if (work && worker) {
        const works = await worker.getWorks();
        let hours = 0;

        for (let work of works) {
            hours += work.hoursPerDay;
        }

        if ((hours + work.hoursPerDay) <= 20) {
            const EmpWorker = await EmployWorker.findOne({where: Sequalize.and({WorkId: idWork}, {WorkerId: idWorker})});
            if (!EmpWorker) {
                await worker.addWork(work, {through: {date: momentjs().format('YYYY-MM-DD')}});
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
})

router.post('/', async (req, res) => {
    const {name} = req.body;
    if (name && typeof(name) === 'string') {
        const worker = await Worker.create({name})
        res.statusCode = 201;
        res.json({message: 'Worker has been created successfully!', worker});
    } else {
        res.statusCode = 400;
        res.json({message: 'Incorrent parameters in request'});
    }
})

router.delete('/:id', async (req, res) => {
    const worker = await Worker.destroy({where: {id: req.params.id}});
    if (worker) {
        res.statusCode = 200;
        res.json({message: `Worker with id: ${req.params.id} has been removed`});
    } else {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${req.params.id} not found`});
    }
})

router.put('/:id', async (req, res) => {
    const {name} = req.body;
    const worker = await Worker.findOne({where: {id: req.params.id}});
    if (worker && name && typeof(name) === 'string') {
        await Worker.update({name}, {where: {id: req.params.id}});
        const worker = await Worker.findOne({where: {id: req.params.id}});
        res.statusCode = 200;
        res.json({message: `Worker with id: ${req.params.id} has been updated`, worker});
    } else {
        if (!worker) {
            res.statusCode = 404;
            res.json({message: `Worker with id: ${req.params.id} not found`});
        } else {
            res.statusCode = 400;
            res.json({message: 'Incorrent parameter(s) in request'});
        }
    }
})

router.patch('/:id', async (req, res) => {
    const {name} = req.body;
    const worker = await Worker.findOne({where: {id: req.params.id}});
    if (worker && name && typeof(name) === 'string') {
        await Worker.update({name}, {where: {id: req.params.id}});
        const worker = await Worker.findOne({where: {id: req.params.id}});
        res.statusCode = 200;
        res.json({message: `Worker with id: ${req.params.id} has been updated`, worker});
    } else {
        if (!worker) {
            res.statusCode = 404;
            res.json({message: `Worker with id: ${req.params.id} not found`});
        } else {
            res.statusCode = 400;
            res.json({message: 'Incorrent parameter(s) in request'});
        }
    }
})

module.exports = router;