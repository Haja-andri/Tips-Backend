
exports.up = function(knex) {
    return knex.schema.createTable('cards', cards =>{
        cards.increments();
        cards.integer('customer_id').notNullable() // foreign key to workers table
            .unsigned()
            .references('id')
            .inTable('customers')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        cards.string('token', 128).notNullable().unique();
        cards.date('expiry_date').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cards')
};
