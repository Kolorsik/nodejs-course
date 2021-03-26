import {Document} from 'mongoose';

export default interface IWork extends Document {
    name: String,
    salary: Number,
    hoursPerDay: Number
}