const db = require('../dbConfig');

module.exports = {
    add,
    getAll,
    findById,
};

async function add(user) {
    // add workers
}

function getAll() {
    return db('workers');
}

function findById(id) {
    // retuen a worker by its ID
}