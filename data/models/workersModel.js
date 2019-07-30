const db = require('../dbConfig');

module.exports = {
    add,
    getAll,
    findById,
    findByFilter,
};

async function add(workers) {
    // add workers
    const [id] = await db('workers').insert(workers)
    return findById(id);
}

function getAll() {
    return db('workers');
}

function findById(id) {
    return db('workers').where('workers.id', id)
}

function findByFilter(filter) {
    return db('workers').where(filter);
}