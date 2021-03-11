const fs = require('fs');
const requireFields = ['email', 'categories', 'japaneseKnowledge', 'level'];
const availableCategories = ['nodejs', 'angular', 'javascript', 'react'];
const availableLevels = ['junior', 'middle', 'senior'];
const path = require('path');
const dbPath = path.resolve(__dirname, './db/applicants');

function getRequiredFieldsCheckError(requiredFields, objectToCheck) {
    const errors = [];
    requiredFields.forEach(requiredField => {
        if (!objectToCheck.hasOwnProperty(requiredField)) {
            errors.push(requiredField);
        }
    });

    if (typeof(objectToCheck.japaneseKnowledge) !== 'boolean' ||
        !objectToCheck.categories || typeof(objectToCheck.categories) !== 'object' ||
        !objectToCheck.email || typeof(objectToCheck.email) !== 'string' ||
        !objectToCheck.level || typeof(objectToCheck.level) !== 'string' || !availableLevels.includes(objectToCheck.level)) {
        errors.push('error');
    }

    objectToCheck.categories.forEach(el => {
        if (!availableCategories.includes(el)) {
            errors.push('Error with categories');
        }
    })

    return errors.length ? 'No required property(ies)' : false;
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

async function addApplicant(applicant) {
    const errorMessage = getRequiredFieldsCheckError(requireFields, applicant);
    if (errorMessage) {
        throw new Error(errorMessage);
    }
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath);
    }
    applicant.id = `${applicant.email}-${(new Date).getTime()}`;
    await fs.promises.writeFile(`${dbPath}/${applicant.id}.txt`, JSON.stringify(applicant));
    return applicant;
}

async function updateApplicant(id, newApplicant) {
    const errorMessage = getRequiredFieldsCheckError(requireFields, newApplicant);
    if (errorMessage) {
        throw new Error(errorMessage);
    }

    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath);
    }

    if (fs.existsSync(`${dbPath}/${id}.txt`)) {
        const applicant = JSON.parse(await fs.promises.readFile(`${dbPath}/${id}.txt`, 'utf-8'));
        const updatedApplicant = Object.assign(applicant, newApplicant);
        await fs.promises.writeFile(`${dbPath}/${id}.txt`, JSON.stringify(updatedApplicant));
        return updatedApplicant;
    } else {
        return null;
    }
}

async function removeApplicant(id) {
    console.log(id);
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

module.exports = {
    addApplicant,
    updateApplicant,
    removeApplicant,
    getAllPositions
}