
exports.up = function(knex) {
    return knex.schema.createTable('workers', workers =>{
        workers.increments();
        workers.string('name', 128).notNullable();
        workers.string('first_name', 128).notNullable();
        workers.string('job_title', 255).notNullable();
        workers.string('mobile', 128).unique();
        workers.string('email', 128).notNullable().unique();
        workers.string('photo', 128);
        workers.date('start_date', 128);
        workers.string('tagline', 128).notNullable();
        workers.date('password', 128).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('workers');
};
