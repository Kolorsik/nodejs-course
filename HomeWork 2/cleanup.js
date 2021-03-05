// TODO: Homework
//      function cleanup (): Remove output folder
//      Use "exports" instead of "module.exports"
const fs = require('fs')
function cleanup () {
    const dir = './output';
    console.log('delete output folder')
    fs.rmdirSync(dir, { recursive: true });
}

exports.cleanup = cleanup;