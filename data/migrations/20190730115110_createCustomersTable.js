
exports.up = function(knex) {
    return knex.schema.createTable('customers', customers =>{
        customers.increments();
        customers.string('name', 128).notNullable();
        customers.string('first_name', 128).notNullable();
        customers.string('mobile', 128).unique();
        customers.string('email', 128).notNullable().unique();
        customers.date('password', 128);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('customers')
};
