const {Router} = require('express');
const sequelize = require('../../database/sequelize');
const Worker = require('../../models/Worker');
const Work = require('../../models/Work');
const EmployWorker = require('../../models/EmployWorker');
const momentjs = require('moment');
const router = Router();

router.get('/', async (req, res) => {
    const workers = await sequelize.query('select * from Workers', {
        model: Worker,
        mapToModel: true
    });
    res.statusCode = 200;
    res.json(workers);
})

router.get('/:id', async (req, res) => {
    const worker = await sequelize.query(`select * from Workers where Id = ${req.params.id}`, {
        model: Worker,
        mapToModel: true,
        plain: true
    });
    if (worker) {
        res.statusCode = 200;
        res.json(worker);
    } else {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${req.params.id} not found`});
    }
})


router.post('/', async (req, res) => {
    const {name} = req.body;
    if (name && typeof(name) === 'string') {
        const [idWorker, count] = await sequelize.query(`insert into Workers (name) values ('${name}')`);
        const worker = await sequelize.query(`select * from Workers where Id = ${idWorker}`, {
            model: Worker,
            mapToModel: true,
            plain: true
        });
        res.statusCode = 201;
        res.json({message: 'Worker has been created successfully!', worker});
    } else {
        res.statusCode = 400;
        res.json({message: 'Incorrent parameters in request'});
    }
})

router.delete('/:id', async (req, res) => {
    const [worker, count] = await sequelize.query(`delete from Workers where Id = ${req.params.id}`);
    if (worker.affectedRows !== 0) {
        res.statusCode = 200;
        res.json({message: `Worker with id: ${req.params.id} has been removed`});
    } else {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${req.params.id} not found`});
    }
})

router.put('/:id', async (req, res) => {
    const {name} = req.body;
    const worker = await sequelize.query(`select * from Workers where Id = ${req.params.id}`, {
        model: Worker,
        mapToModel: true,
        plain: true
    });
    if (worker && name && typeof(name) === 'string') {
        await sequelize.query(`update Workers set Name = '${name}' where Id = ${req.params.id}`);
        const worker = await sequelize.query(`select * from Workers where Id = ${req.params.id}`, {
            model: Worker,
            mapToModel: true,
            plain: true
        });
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

router.delete('/:idWorker/:idWork', async (req, res) => {
    const {idWorker, idWork} = req.params;
    const worker = await sequelize.query(`select * from Workers where Id = ${idWorker}`, {
        model: Worker,
        mapToModel: true,
        plain: true
    });
    if (worker) {
        const query = 'SELECT `id`, `date`, `WorkId`, `WorkerId` FROM `EmployWorkers` AS `EmployWorker` WHERE `EmployWorker`.`WorkerId` = ' + idWorker + ' AND `EmployWorker`.`WorkId` ' +  `IN (${idWork})`;
        const EmpWorker = await sequelize.query(query, {
            model: EmployWorker,
            mapToModel: true,
            plain: true
        });
        if (EmpWorker) {
            const q = 'DELETE FROM `EmployWorkers` WHERE `id` = ' + EmpWorker.id;
            await sequelize.query(q);
            res.statusCode = 200;
            res.json({message: `Work with id: ${idWork} has been removed from worker with id: ${idWorker}`});
        } else {
            res.statusCode = 400;
            res.json({message: `Worker with id: ${idWorker} does not have work with id: ${idWork}`});
        }
    } else {
        res.statusCode = 404;
        res.json({message: `Worker with id: ${idWorker} not found`});
    }
})

router.post('/:idWorker/:idWork', async (req, res) => {
    const {idWorker, idWork} = req.params;
    const work = await sequelize.query(`select * from Works where Id = ${idWork}`, {
        model: Work,
        mapToModel: true,
        plain: true
    });

    const worker = await sequelize.query(`select * from Workers where Id = ${idWorker}`, {
        model: Worker,
        mapToModel: true,
        plain: true
    });

    if (work && worker) {
        const query = 'SELECT `Works`.`Id` AS `id`, `Works`.`Name` AS `name`, `Works`.`Salary` AS `salary`, `Works`.`HoursPerDay` AS `hoursPerDay`, `EmployWorker`.`id` AS `EmployWorker.id`, `EmployWorker`.`date` AS `EmployWorker.date`, `EmployWorker`.`WorkId` AS `EmployWorker.WorkId`, `EmployWorker`.`WorkerId` AS `EmployWorker.WorkerId` FROM `Works` AS `Works` INNER JOIN `EmployWorkers` AS `EmployWorker` ON `Works`.`Id` = `EmployWorker`.`WorkId` AND `EmployWorker`.`WorkerId` = ' + idWorker;
        const works = await sequelize.query(query, {
            model: Work,
            mapToModel: true,
        });
        let hours = 0;

        for (let work of works) {
            hours += work.dataValues.hoursPerDay;
        }

        if ((hours + work.hoursPerDay) <= 20) {
            const q = 'SELECT `id`, `date`, `WorkId`, `WorkerId` FROM `EmployWorkers` AS `EmployWorker` WHERE `EmployWorker`.`WorkerId` = ' + idWorker + ' AND `EmployWorker`.`WorkId` ' +  `IN (${idWork})`;
            const EmpWorker = await sequelize.query(q, {
                model: EmployWorker,
                mapToModel: true,
                plain: true
            })
            if (!EmpWorker) {
                const date = momentjs().format('YYYY-MM-DD');
                const query = 'insert into `EmployWorkers` (`id`,`date`,`WorkId`,`WorkerId`) ' + `VALUES (NULL,'${date}',${idWork},${idWorker})`;
                await sequelize.query(query);
                res.statusCode = 200;
                res.json({message: `Work with id: ${idWork} added to workers with id: ${idWorker}`});
            } else {
                res.statusCode = 400;
                res.json({message: `Worker with id: ${idWorker} already has work with id: ${idWork}`});
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

router.get('/:id/works', async (req, res) => {
    const worker = await sequelize.query(`select * from Workers where Id = ${req.params.id}`, {
        model: Worker,
        mapToModel: true,
        plain: true
    });
    if (worker) {
        let salary = 0;
        const query = 'SELECT `Works`.`Id` AS `id`, `Works`.`Name` AS `name`, `Works`.`Salary` AS `salary`, `Works`.`HoursPerDay` AS `hoursPerDay`, `EmployWorker`.`id` AS `EmployWorker.id`, `EmployWorker`.`date` AS `EmployWorker.date`, `EmployWorker`.`WorkId` AS `EmployWorker.WorkId`, `EmployWorker`.`WorkerId` AS `EmployWorker.WorkerId` FROM `Works` AS `Works` INNER JOIN `EmployWorkers` AS `EmployWorker` ON `Works`.`Id` = `EmployWorker`.`WorkId` AND `EmployWorker`.`WorkerId` = ' + req.params.id;
        const works = await sequelize.query(query, {
            model: Work,
            mapToModel: true,
        });

        for (let work of works) {
            salary += work.dataValues.salary;
            work.dataValues.EmployWorker = {
                id: work.dataValues['EmployWorker.id'],
                date: work.dataValues['EmployWorker.date'],
                WorkId: work.dataValues['EmployWorker.WorkId'],
                WorkerId: work.dataValues['EmployWorker.WorkerId']
            }
            delete work.dataValues['EmployWorker.id'];
            delete work.dataValues['EmployWorker.date'];
            delete work.dataValues['EmployWorker.WorkId'];
            delete work.dataValues['EmployWorker.WorkerId']
        }
        res.statusCode = 200;
        res.json({works, totalSalary: salary});
    } else {
        res.statusCode = 400;
        res.json({message: `Worker with id: ${req.params.id} not found`})
    }
})

router.patch('/:id', async (req, res) => {
    const {name} = req.body;
    const worker = await sequelize.query(`select * from Workers where Id = ${req.params.id}`, {
        model: Worker,
        mapToModel: true,
        plain: true
    });
    if (worker && name && typeof(name) === 'string') {
        await sequelize.query(`update Workers set Name = '${name}' where Id = ${req.params.id}`);
        const worker = await sequelize.query(`select * from Workers where Id = ${req.params.id}`, {
            model: Worker,
            mapToModel: true,
            plain: true
        });
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