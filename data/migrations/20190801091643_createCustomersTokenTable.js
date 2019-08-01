
exports.up = function(knex) {
    return knex.schema.createTable('customers_token', customers =>{
        customers.increments();
        customers.integer('customer_id').notNullable() // foreign key to customer table
            .unsigned()
            .references('id')
            .inTable('customers')
            // the customer_id refering to customers table must be unique
            // to prevent having multiple token for a single customer
            .unique() 
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
            customers.string('token', 255).notNullable().unique();
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('customers_token')
};