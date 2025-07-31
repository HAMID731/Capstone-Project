const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '../data');

async function ensureDataDir() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (error) {
        console.error('Error ensuring data directory:', error);
    }
}

async function readData(fileName) {
    const filePath = path.join(DATA_DIR, `${fileName}.json`);
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        console.error(`Error reading ${fileName}:`, error);
        throw error;
    }
}

async function writeData(fileName, data) {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, `${fileName}.json`);
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing ${fileName}:`, error);
        throw error;
    }
}


const fileStorage = {
    async getAll(collectionName) {
        return readData(collectionName);
    },

    async getById(collectionName, id) {
        const records = await readData(collectionName);
        return records.find(record => record.id === id);
    },

    async create(collectionName, newRecord) {
        const records = await readData(collectionName);
        const recordWithId = { id: uuidv4(), ...newRecord };
        records.push(recordWithId);
        await writeData(collectionName, records);
        return recordWithId;
    },

    async update(collectionName, id, updateData) {
        const records = await readData(collectionName);
        const index = records.findIndex(record => record.id === id);
        if (index === -1) {
            return null; 
        }
        const updatedRecord = { ...records[index], ...updateData, id: id }; // Ensure ID is preserved
        records[index] = updatedRecord;
        await writeData(collectionName, records);
        return updatedRecord;
    },

    async delete(collectionName, id) {
        const records = await readData(collectionName);
        const initialLength = records.length;
        const newRecords = records.filter(record => record.id !== id);
        if (newRecords.length === initialLength) {
            return false;
        }
        await writeData(collectionName, newRecords);
        return true;
    }
};

module.exports = fileStorage;