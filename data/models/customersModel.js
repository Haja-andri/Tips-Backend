const db = require('../dbConfig');

module.exports = {
    add,
    findById,
    subsribe,
    findByFilter,
    findTokenByCustomerId,
    updateCustomerToken,
    insertCustomerToken,
    getPaymentsHistory,
    removeCustomerToken
};

async function add(customers) {
    // add customers
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

function findByFilter(filter) {
    return db('customers').where(filter);
}

function findTokenByCustomerId(id) {
    return db('customers_token').where('customer_id', id)
}

async function updateCustomerToken(updatedToken){
    return await db('customers_token').update('token', updatedToken.token).where('customer_id', updatedToken.customer_id )
}

async function insertCustomerToken(token){
    return await db('customers_token').insert(token)
}

async function getPaymentsHistory(customerId){
    return await db('payments').select('amount', 'created_at').where('payments.id', customerId);
}

function removeCustomerToken(id){
    return db('customers_token').del().where('customer_id', id)
}