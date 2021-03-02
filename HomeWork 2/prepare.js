'use strict'

/**
 * Resources: 
 * https://nodejs.org/docs/latest-v12.x/api/fs.html
 * https://lodash.com/docs
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 * https://nodejs.org/api/modules.html (module.exports, exports, require)
 */

// TODO: Prepare working directory script:
//      - function checkGitignore(): Check if ".gitignore" file exists, otherwise throw an error: "No '.gitignore' file. Please create .gitignore' file, otherwise all .txt files will be commited"
//      - function checkOutputFolder(): Check "output" folder. If 'output' folder exists, throw an error:
//                                      "Output folder is here, but need to be removed (use cleanup script)"
//                                      If there is no folder, proceed
//      - function createOutputFolder(): Create directory "output"
//      NOTE: file can be executed as script or can be exported

const fs = require('fs');
const {isEqual, difference} = require('lodash');
const {requiredFiles} = require('./resources.json')
const {cleanup} = require('./cleanup');


function prepareWorkspace() {
    checkGitignore();
    checkDataFolder();
    checkOutputFolder();
}

function checkGitignore() {
    if (!fs.existsSync('./.gitignore')) {
        throw new Error("No '.gitignore' file. Please create .gitignore' file, otherwise all .txt files will be commited");
    }
    console.log(' -> ./.gitignore file exists');
}

function checkDataFolder() {
    if (!fs.existsSync('./data')) {
        throw new Error("No 'data' file");
    }
    console.log(' -> ./data folder exists');

    const existFiles = fs.readdirSync('./data');
    if (!isEqual(existFiles, requiredFiles)) {
        throw new Error(`Not enough files in './data' folder: missed '${difference(requiredFiles, existFiles)}' file(s)`);
    }
    console.log(' -> files in ./data folder exist');
}

function checkOutputFolder() {
    if (fs.existsSync('./output')) {
        cleanup();
        //throw new Error("Output folder is here, but need to be removed (use cleanup script)");
    } else {
        createOutputFolder();
    }
}

function createOutputFolder() {
    const dir = './output';
    fs.mkdir(dir, (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Output folder created successfully');
        }
    });
}

if(require.main === module){
    prepareWorkspace();
}

module.exports = prepareWorkspace;