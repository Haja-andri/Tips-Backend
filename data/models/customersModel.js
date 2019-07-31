const db = require('../dbConfig');

module.exports = {
    add,
    findById,
    subsribe
};

async function add(customers) {
    // add workers
    const [id] = await db('customers').insert(customers)
    return findById(id);
}

function findById(id) {
    return db('customers').where('customers.id', id)
}

async function subsribe(customer) {
    await db('customers').update( { password: customer.password } ).where('customers.id', customer.id)
    return findById(customer.id);
}