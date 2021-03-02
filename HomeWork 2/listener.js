// TODO: Add logic for the next todos:
//       import an instance of FileProcessor class from main.js
//       create listeners and listen to events (define by yourself what you want to do inside the listeners)
//       handle 'error' event

const fileProcessingEventEmitter = require('./fileProcessor');

function listenerForPrepare(...messages) {
    // this listener is an example: he wants to be subscribed on 'prepare' event
    console.log('"prepare" event has been handled');
    console.log(`Received messages: ${messages.join('.')}`);
}

// This listener wants o be subscribed on event, emitter for 'dealWithEventsInStreamsInFs'
function listenerSecond(...messages) {
    console.log('"dealWithEventsInStreamsInFs" event has been handled');
    console.log(`Received messages: ${messages.join('.')}`);
}

// This listener wants o be subscribed on event, emitter for 'dealWithStreamsInFs'
function listenerThird(...messages) {
    console.log('"dealWithEventsInStreamsInFs" event has been handled');
    console.log(`Received messages: ${messages.join('.')}`);
}

function chunkListener(chunks) {
    console.log(`Count of loaded chunks: ${chunks}`)
}

function errorListener() {
    throw new Error('Error with handle some event');
}


exports.registerAllListeners = function () {
    // This is an example how to subscribe on event
    fileProcessingEventEmitter.on('prepare', listenerForPrepare);
    fileProcessingEventEmitter.on('dealWithEventsInStreamsInFs', listenerSecond);
    fileProcessingEventEmitter.on('dealWithStreamsInFs', listenerThird);
    fileProcessingEventEmitter.on('error', errorListener);
    fileProcessingEventEmitter.on('chunkListener', chunkListener);

    // TODO: subscribe to all other events
}