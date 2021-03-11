// TODO: add skipped functions
const fs = require('fs');
const requireFields = ['company', 'level', 'japaneseRequired', 'category']; // TODO: add here all required fields for positions
const availableCategories = ['nodejs', 'angular', 'javascript', 'react'];
const availableLevels = ['junior', 'middle', 'senior'];
const path = require('path');
const dbPath = path.resolve(__dirname, './db/positions');

async function addNewPosition(position) {
    const errorMessage = getRequiredFieldsForPostCheckError(requireFields, position);
    if (errorMessage) {
        throw new Error(errorMessage);
    }
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath);
    }
    position.id = `${position.company}-${(new Date).getTime()}`;
    await fs.promises.writeFile(`${dbPath}/${position.id}.txt`, JSON.stringify(position));
    return position;
}

function getRequiredFieldsForPostCheckError(requiredFields, objectToCheck) {
    const errors = [];
    requiredFields.forEach(requiredField => {
        if (!objectToCheck.hasOwnProperty(requiredField)) {
            errors.push(requiredField);
        }
    });

    if (Object.keys(objectToCheck).length !== 4) {
        if (Object.keys(objectToCheck).length !== 5 || !objectToCheck.description || typeof(objectToCheck.description) !== 'string') {
            errors.push('error');
        }
    }

    if (typeof(objectToCheck.japaneseRequired) !== 'boolean' ||
        !objectToCheck.category || typeof(objectToCheck.category) !== 'string' ||
        !objectToCheck.level || typeof(objectToCheck.level) !== 'string' ||
        !objectToCheck.company || typeof(objectToCheck.company) !== 'string' || !availableCategories.includes(objectToCheck.category) ||
        !availableLevels.includes(objectToCheck.level)) {
        error.push('error');
    }
    return errors.length ? 'Error with required property(ies)' : false;
}

async function getPositionById(id) {
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath);
    }

    if (fs.existsSync(`${dbPath}/${id}.txt`)) {
        const position = await fs.promises.readFile(`${dbPath}/${id}.txt`, 'utf-8');
        return JSON.parse(position);
    } else {
        return null;
    }
}

async function removePosition(id) {
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath);
    }

    if (fs.existsSync(`${dbPath}/${id}.txt`)) {
        const position = await fs.promises.readFile(`${dbPath}/${id}.txt`, 'utf-8');
        await fs.promises.unlink(`${dbPath}/${id}.txt`);
        return JSON.parse(position);
    } else {
        return null;
    }
}

function getRequiredFieldsForPatchCheckError(objectToCheck) {
    const errors = [];
    const fields = ['description', 'japaneseRequired'];
    for (let prop in objectToCheck) {
        if (!fields.includes(prop)) {
            errors.push('Error with properties in patch method');
        }
    }

    if (objectToCheck.description) {
        if (typeof(objectToCheck.description) !== 'string') {
            errors.push('Error with descriprion field');
        }
    }

    if (objectToCheck.japaneseRequired) {
        if (typeof(objectToCheck.japaneseRequired) !== 'boolean') {
            errors.push('Error with japaneseRequired field');
        }
    }

    return errors.length ? 'No required property(ies) or invalid types' : false;
}

async function updatePosition(id, newPosition) {
    const errorMessage = getRequiredFieldsForPatchCheckError(newPosition);
    if (errorMessage) {
        throw new Error(errorMessage);
    }

    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath);
    }

    if (fs.existsSync(`${dbPath}/${id}.txt`)) {
        const position = JSON.parse(await fs.promises.readFile(`${dbPath}/${id}.txt`, 'utf-8'));
        const updatedPosition = Object.assign(position, newPosition);
        await fs.promises.writeFile(`${dbPath}/${id}.txt`, JSON.stringify(updatedPosition));
        return updatedPosition;
    } else {
        return null;
    }
}

async function getAllPositions() {
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath);
    }
    const positionFilesList = await fs.promises.readdir(dbPath);
    return Promise.all(positionFilesList.map(async positionFile => {
        const positionRaw = await fs.promises.readFile(`${dbPath}/${positionFile}`, 'utf8');
        return JSON.parse(positionRaw);
    }));
}

module.exports = {
    addNewPosition,
    getAllPositions,
    getPositionById,
    removePosition,
    updatePosition
}