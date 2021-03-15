const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const sequelize = require('./database/sequelize');

const v1WorkersRoutes = require('./routes/v1/worker');
const v1WorksRoutes = require('./routes/v1/work');
const v2WorkersRoutes = require('./routes/v2/worker');
const v2WorksRoutes = require('./routes/v2/work');
const errorRoute = require('./routes/error');

const Work = require('./models/Work');
const Worker = require('./models/Worker');
const EmployWorker = require('./models/EmployWorker');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.use('/v1/workers', v1WorkersRoutes);
app.use('/v1/works', v1WorksRoutes);

app.use('/v2/workers', v2WorkersRoutes);
app.use('/v2/works', v2WorksRoutes);

app.use(errorRoute);

app.listen(port, async () => {
    Work.belongsToMany(Worker, {through: EmployWorker});
    Worker.belongsToMany(Work, {through: EmployWorker});
    await sequelize.sync()
    console.log(`Server is starting on port ${port}!`)
})