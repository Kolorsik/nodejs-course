// TODO: add routes for Applicants
// TODO: add skipped logic for
// TODO: Connect this file with server.js and with app variable

const positionModel = require('./positions');
const applicantModel = require('./applicants');
const emitter = require('./mailSender');
const myEmitter = emitter.myEmitter;

module.exports = function routers(app) {

    app.put('/applicants/:id', async (req, res) => {
        applicantModel.updateApplicant(req.params.id, req.body).then((applicant) => {
            if (applicant) {
                res.statusCode = 201;
                res.write(`Applicant with id: ${applicant.id} has been updated!`);
                res.end();
            } else {
                res.statusCode = 404;
                res.write('Position not found!');
                res.end();
            }
        })
    })

    app.delete('/applicants/:id', async (req, res) => {
        applicantModel.removeApplicant(req.params.id).then((applicant) => {
            if (applicant) {
                res.statusCode = 204;
                res.write(`Applicant with id: ${applicant.id} has been removed!`);
                res.end();
            } else {
                res.statusCode = 404;
                res.write('Applicant not found!');
                res.end();
            }
        });
    })

    app.post('/applicants', async (req, res) => {
        try {
            const applicant = await applicantModel.addApplicant(req.body);
            res.statusCode = 201;
            res.write(`New applicant with id='${applicant.id}' created`);
            res.end();
        } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify(e));
            return e;
        }
    })

    app.get('/positions', async (req, res, next) => {
        try {
            let positions = await positionModel.getAllPositions();
            if (req.query.level) {
                positions = positions.filter(p => p.level === req.query.level);
            }

            if (req.query.category) {
                positions = positions.filter(p => p.category === req.query.category);
            }

            if (req.query.tag) {
                positions = positions.filter(p => p.description.includes(req.query.tag));
            }
            res.setHeader('content-type', 'application/json');
            res.statusCode = 200;
            res.json(positions);
        } catch (e) {
            next(e);
        }
    });
    
    app.get('/positions/:id', (req, res) => {
        positionModel.getPositionById(req.params.id).then((pos) => {
            if (pos) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.json(pos);
            } else {
                res.statusCode = 404;
                res.write('Position not found!');
                res.end();
            }
        });
    });

    app.post('/positions', async (req, res, next) => {
        try {
            const position = await positionModel.addNewPosition(req.body);
            res.setHeader('Location', '/positions/' + position.id);
            res.statusCode = 201;
            res.write(`New position with id='${position.id}' created`);
            myEmitter.emit('addPosition', position);
            res.end();
        } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify(e));
            return e;
        }
    });

    app.patch('/positions/:id', (req, res) => {
        positionModel.updatePosition(req.params.id, req.body).then((pos) => {
            if (pos) {
                res.statusCode = 200;
                res.write(`Position with id: ${pos.id} has been updated!`);
                res.end();
            } else {
                res.statusCode = 404;
                res.write('Position not found!');
                res.end();
            }
        })
    });

    app.delete('/positions/:id', (req, res) => {
        positionModel.removePosition(req.params.id).then((pos) => {
            if (pos) {
                res.statusCode = 204;
                res.write(`Position with id: ${pos.id} has been removed!`);
                myEmitter.emit('removePosition', pos);
                res.end();
            } else {
                res.statusCode = 404;
                res.write('Position not found!');
                res.end();
            }
        });
    });
    
    app.use((err, request, response, next) => {
        console.log(err)
        response.status(500).send("Unexpected server error: " + JSON.stringify(err))
    })
}