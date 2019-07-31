
exports.up = function(knex) {
    return knex.schema.createTable('workers_token', workers =>{
        workers.increments();
        workers.integer('worker_id').notNullable() // foreign key to workers table
            .unsigned()
            .references('id')
            .inTable('workers')
            // the worker_id refering to workers table must be unique
            // to prevent having multiple token for a single worker
            .unique() 
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
            workers.string('token', 255).notNullable().unique();
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('workers_token')
};
