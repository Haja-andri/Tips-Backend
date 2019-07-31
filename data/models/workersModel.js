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
    removeWorkerToken,
};

async function add(workers) {
    // add workers
    const [id] = await db('workers').insert(workers)
    return findById(id);
}

function getAll() {
    //return all workers and related account including the ones that does not have an account yet
    return db('workers').select('*').from('workers').leftJoin('accounts', 'workers.id', 'worker_id');
}

function findById(id) {
    return db('workers').where('workers.id', id)
}

function findByFilter(filter) {
    return db('workers').where(filter);
}

function getWorkersAccount(id) {
    //return all workers that has am account created with the account info
    return db('accounts').select('*').from('workers').innerJoin('accounts', 'workers.id', 'worker_id');
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

function removeWorkerToken(id){
    return db('workers_token').delete('worker_id', id)
}