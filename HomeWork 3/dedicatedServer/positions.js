// TODO: add method to get all positions, export this new method
const fs = require('fs');
const path = require('path');
const requireFields = ['category', 'level', 'company', 'description'];

async function addNewPosition(position) {
    checkRequiredFields(requireFields, position);
    position.id = `${position.company}-${(new Date).getTime()}`;
    if (!fs.existsSync('./db')) {
        fs.mkdirSync('./db');
    }
    // TODO: use 'path' library to construct file paths: https://nodejs.org/api/path.html
    await fs.promises.writeFile(path.join('./db', `${position.id}.txt`), JSON.stringify(position));
    return position.id;
}

async function getAllPositions() {
    const positions = [];
    if (fs.existsSync('./db')) {
        fs.readdirSync('./db').forEach(file => {
            const data = fs.readFileSync(path.join('./db', file), 'utf-8');
            positions.push(JSON.parse(data));
        })
        return positions;
    } else {
        return positions;
    }
}

function checkRequiredFields(requiredFields, objectToCheck) {
    requireFields.forEach(requireField => {
        if (!objectToCheck.hasOwnProperty(requireField)) {
            throw new Error(`No required property '${requireField}' in a new position`);
        }
    });
}

module.exports = {
    addNewPosition,
    getAllPositions
}