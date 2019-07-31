const db = require('../dbConfig');

module.exports = {
    add,
    getAll,
    findById,
    findByFilter,
    getWorkersAccount,
    insertWorkerToken,
    updateWorkerToken,
    findTokenByWorkerId,
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

function getWorkersAccount(id) {
    return db('accounts').where('worker_id', id)
}

async function insertWorkerToken(token){
    return await db('workers_token').insert(token)
}

async function updateWorkerToken(updatedToken){
    return await db('workers_token').update('token', updatedToken.token).where('worker_id', updatedToken.worker_id )
}

function findTokenByWorkerId(id) {
    return db('workers_token').where('worker_id', id)
}