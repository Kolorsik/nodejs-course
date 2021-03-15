const {Router} = require('express');
const sequelize = require('../../database/sequelize');
const Worker = require('../../models/Worker');
const Work = require('../../models/Work');
const EmployWorker = require('../../models/EmployWorker');
const router = Router();

router.get('/', async (req, res) => {
    const works = await sequelize.query('select * from Works', {
        model: Work,
        mapToModel: true
    });
    res.statusCode = 200;
    res.json(works);
})

router.get('/:id', async (req, res) => {
    const work = await sequelize.query(`select * from Works where Id = ${req.params.id}`, {
        model: Work,
        mapToModel: true,
        plain: true
    });
    if (work) {
        res.statusCode = 200;
        res.json(work);
    } else {
        res.statusCode = 404;
        res.json({message: `Work with id: ${req.params.id} not found`});
    }
})

router.post('/', async (req, res) => {
    const {name, salary, hoursPerDay} = req.body;
    if (name && salary && hoursPerDay && typeof(name) === 'string' && typeof(salary) === 'number' && typeof(hoursPerDay) === 'number') {
        const [idWork, count] = await sequelize.query(`insert into Works (name, salary, hoursPerDay) values ('${name}', ${salary}, ${hoursPerDay})`);
        const work = await sequelize.query(`select * from Works where Id = ${idWork}`, {
            model: Work,
            mapToModel: true,
            plain: true
        });
        res.statusCode = 201;
        res.json({message: 'Work has been created successfully!', work});
    } else {
        res.statusCode = 400;
        res.json({message: 'Incorrent parameters in request'});
    }
})

router.delete('/:id', async (req, res) => {
    const [work, count] = await sequelize.query(`delete from Works where Id = ${req.params.id}`);
    if (work.affectedRows !== 0) {
        res.statusCode = 200;
        res.json({message: `Work with id: ${req.params.id} has been removed`});
    } else {
        res.statusCode = 404;
        res.json({message: `Work with id: ${req.params.id} not found`});
    }
})

router.patch('/:id', async (req, res) => {
    const {name, salary, hoursPerDay} = req.body;
    const work = await sequelize.query(`select * from Works where Id = ${req.params.id}`, {
        model: Work,
        mapToModel: true,
        plain: true
    });
    if (work && ((name && typeof(name) === 'string') || (salary && typeof(salary) === 'number') || (hoursPerDay && typeof(hoursPerDay) === 'number'))) {
        let query = 'update Works set ';
        if (name) {
            query += `Name = '${name}',`;
        }
        if (salary) {
            query += `Salary = ${salary},`;
        }
        if (hoursPerDay) {
            query += `HoursPerDay = ${hoursPerDay},`;
        }
        query = query.slice(0, -1);
        query += ` where Id = ${req.params.id}`;
        await sequelize.query(query);
        const work = await sequelize.query(`select * from Works where Id = ${req.params.id}`, {
            model: Work,
            mapToModel: true,
            plain: true
        });
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

router.put('/:id', async (req, res) => {
    const {name, salary, hoursPerDay} = req.body;
    const work = await sequelize.query(`select * from Works where Id = ${req.params.id}`, {
        model: Work,
        mapToModel: true,
        plain: true
    });
    if (work && name && typeof(name) === 'string' && salary && typeof(salary) === 'number' && hoursPerDay && typeof(hoursPerDay) === 'number') {
        await sequelize.query(`update Works set Name = '${name}', Salary = ${salary}, HoursPerDay = ${hoursPerDay} where Id = ${req.params.id}`);
        const work = await sequelize.query(`select * from Works where Id = ${req.params.id}`, {
            model: Work,
            mapToModel: true,
            plain: true
        });
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

router.get('/:id/workers', async (req, res) => {
    const work = await sequelize.query(`select * from Works where Id = ${req.params.id}`, {
        model: Work,
        mapToModel: true,
        plain: true
    });

    if (work) {
        const query = 'SELECT `Workers`.`Id` AS `id`, `Workers`.`Name` AS `name`, `EmployWorker`.`id` AS `EmployWorker.id`, `EmployWorker`.`date` AS `EmployWorker.date`, `EmployWorker`.`WorkId` AS `EmployWorker.WorkId`, `EmployWorker`.`WorkerId` AS `EmployWorker.WorkerId` FROM `Workers` AS `Workers` INNER JOIN `EmployWorkers` AS `EmployWorker` ON `Workers`.`Id` = `EmployWorker`.`WorkerId` AND `EmployWorker`.`WorkId` = ' + req.params.id;
        const workers = await sequelize.query(query, {
            model: Worker,
            mapToModel: true,
        });

        for (let worker of workers) {
            worker.dataValues.EmployWorker = {
                id: worker.dataValues['EmployWorker.id'],
                date: worker.dataValues['EmployWorker.date'],
                WorkId: worker.dataValues['EmployWorker.WorkId'],
                WorkerId: worker.dataValues['EmployWorker.WorkerId']
            }
            delete worker.dataValues['EmployWorker.id'];
            delete worker.dataValues['EmployWorker.date'];
            delete worker.dataValues['EmployWorker.WorkId'];
            delete worker.dataValues['EmployWorker.WorkerId']
        }

        res.statusCode = 200;
        res.json({workers, salary: work.salary, totalSalary: work.salary * workers.length});
    } else {
        res.statusCode = 400;
        res.json({message: `Work with id: ${req.params.id} not found`});
    }
})

router.delete('/:idWork/:idWorker', async (req, res) => {
    const {idWorker, idWork} = req.params;
    const work = await sequelize.query(`select * from Works where Id = ${idWork}`, {
        model: Work,
        mapToModel: true,
        plain: true
    });
    if (work) {
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
            res.json({message: `Work with id: ${idWork} does not have worker with id: ${idWorker}`});
        }
    } else {
        res.statusCode = 404;
        res.json({message: `Work with id: ${idWorker} not found`});
    }
})

module.exports = router;