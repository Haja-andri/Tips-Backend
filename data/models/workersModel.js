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
    findWorkerWithAccountById,
    removeWorkerToken,
    deleteWorker,
};

async function add(workers) {
    // add workers
    const [id] = await db('workers').insert(workers)
    return findById(id);
}

function getAll() {
    //return all workers and related account including the ones that does not have an account yet
    return db('workers').select(
        'workers.id',
        'workers.name',
        'workers.first_name',
        'workers.job_title',
        'workers.mobile',
        'workers.email',
        'workers.photo',
        'workers.start_date',
        'workers.tagline',
        'accounts.balance',)
        .from('workers').leftJoin('accounts', 'workers.id', 'worker_id');
}

function findWorkerWithAccountById(id) {
    return db('workers').select(
        'workers.name',
        'workers.first_name',
        'workers.mobile',
        'workers.email',
        'accounts.balance',)
    .from('workers').innerJoin('accounts', 'workers.id', 'worker_id' )
    .where('workers.id', id);
}

function findById(id) {
    return db('workers').where('workers.id', id)
}

function findByFilter(filter) {
    return db('workers').where(filter);
}

function getWorkersAccount() {
    //return all workers that has am account created with the account info
    return db('accounts').select(
        'workers.name',
        'workers.first_name',
        'workers.mobile',
        'workers.email',
        'accounts.iban',
        'accounts.balance',)
    .from('workers').innerJoin('accounts', 'workers.id', 'worker_id');
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
    return db('workers_token').del().where('worker_id', id)
}

// delete a given worken with a given id
// cascade down to account deletion
// deletion is denied if account balance > 0
function deleteWorker(id){
    return db('workers').del().where('workers.id', id)
}