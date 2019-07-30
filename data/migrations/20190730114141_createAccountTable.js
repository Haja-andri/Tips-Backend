
exports.up = function(knex) {
    return knex.schema.createTable('accounts', accounts =>{
        accounts.increments();
        accounts.integer('worker_id').notNullable() // foreign key to workers table
            .unsigned()
            .references('id')
            .inTable('workers')
            // the worker_id refering to workers table mus be unique in 
            // account to prevent having multiple account for a single worker
            .unique() 
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        accounts.string('iban', 128).notNullable().unique();
        accounts.string('balance', 128).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('accounts')
};
