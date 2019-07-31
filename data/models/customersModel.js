const db = require('../dbConfig');

module.exports = {
    add,
    findById
};

async function add(customers) {
    // add workers
    const [id] = await db('customers').insert(customers)
    return findById(id);
}

function findById(id) {
    return db('customers').where('customers.id', id)
}