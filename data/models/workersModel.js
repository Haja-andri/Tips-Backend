const db = require('../dbConfig');

module.exports = {
    add,
    getAll,
    findById,
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