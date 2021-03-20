const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');

const workRoutes = require('./routes/work');
const workerRoutes = require('./routes/worker');
const errorRoute = require('./routes/error');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.use('/api/workers', workerRoutes);
app.use('/api/works', workRoutes);

app.use(errorRoute);

app.listen(port, async () => {
    await mongoose.connect('mongodb+srv://<Username>:<Password>@<Cluster Address>/<DB Name>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    console.log(`Server is starting on port ${port}!`)
})