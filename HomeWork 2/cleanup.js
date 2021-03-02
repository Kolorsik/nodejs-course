// TODO: Homework
//      function cleanup (): Remove output folder
//      Use "exports" instead of "module.exports"
const fs = require('fs')
function cleanup () {
    const dir = './output';
    console.log('delete output folder')
    fs.mkdirSync(dir, {recursive: true});
    /*
    fs.rmdir(dir, { recursive: true }, (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Success!')
        }
    })
    */
}

exports.cleanup = cleanup;