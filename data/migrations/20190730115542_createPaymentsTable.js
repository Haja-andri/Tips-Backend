
exports.up = function(knex) {
    return knex.schema.createTable('payments', payments =>{
        payments.increments();
        payments.integer('customer_id').notNullable() // foreign key to customer table
            .unsigned()
            .references('id')
            .inTable('cutomers')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        payments.integer('account_id').notNullable() // foreign key to accounts (workers acccount) table
            .unsigned()
            .references('id')
            .inTable('accounts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');            
        payments.decimal('amount', 8, 2);
        payments.timestamp('created_at').defaultTo(knex.fn.now()) // the payment date defaulted to current date
    })
};

exports.down = function(knex) {
  
};
