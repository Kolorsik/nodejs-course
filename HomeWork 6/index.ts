import express, {Application} from 'express';
import mongoose from 'mongoose'
import {workRoutes} from './routes/work';
import {workerRoutes} from './routes/worker';
import {errorRoutes} from './routes/error';

const app: Application = express();
const port: Number = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/works', workRoutes);
app.use('/api/workers', workerRoutes);

app.use(errorRoutes);

app.listen(port, async (): Promise<void> => {
    await mongoose.connect('mongodb+srv://<Username>:<Password>@<Cluster Address>/<DB Name>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    console.log(`Server is starting on port ${port}`);
})