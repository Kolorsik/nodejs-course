'use strict'
/**
 * Used resources:
 * https://nodejs.org/docs/latest-v12.x/api/fs.html
 * https://nodejs.org/docs/latest-v12.x/api/buffer.html
 * https://nodejs.org/docs/latest-v12.x/api/events.html
 * https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm
 */
//      The main goal - copy files from folder "data" to "output" folder (using fs module) and emit events

const EventEmitter = require('events');
EventEmitter.captureRejection = true; //node --unhandled-rejections=strict
const fs = require("fs");
const prepare = require("./prepare");

class FileProcessor extends EventEmitter {
    constructor(props) {
        super(props);
    }

    run() {
        prepare();
        this.emit('prepare');
        this.dealWithEventsInStreamsInFs();
        this.dealWithStreamsInFs();
        // TODO: call here 'dealWithEventsInStreamsInFs' and 'dealWithStreamsInFs' and emit events

        //this.emit('error', 'Some error message'); // this error has to be handled in listeners
    }

    dealWithEventsInStreamsInFs() {
        this.emit('dealWithEventsInStreamsInFs');
        // Set utf-8 encoding for the read stream
        let chunks = 0;
        const readStream = fs.createReadStream("./data/x.txt", {encoding: 'utf-8'});

        readStream.on("data", (chunk) => {
            chunks++;
            const writeStream = fs.createWriteStream('./output/newTxt.txt', {flags: 'a'});
            writeStream.write(chunk);
            // count chunks and append (use 'a' mode for fs methods) file in output folder with each chunk
        })

        readStream.on("end", () => {
            this.emit('chunkListener', chunks);
            // emit event that you finish to read from the stream, add to event a message with number of chunks
        })

        console.log("Main is finished, but streams are still working");
    }

    dealWithStreamsInFs() {
        this.emit('dealWithStreamsInFs');
        const readStream = fs.createReadStream('./data/s.pdf');
        const writeStream = fs.createWriteStream('./output/newPdf.pdf');

        readStream.pipe(writeStream);

        readStream.on('end', () => {
            console.log('Writing to file was successful');
        })

        readStream.on('error', () => {
            throw new Error('Error writing to file');
        })
        // Use pipe here to read from one stream and write to another
    }
}

module.exports = new FileProcessor();