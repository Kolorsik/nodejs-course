import {Document} from 'mongoose'

export default interface IWorker extends Document {
    name: String
}