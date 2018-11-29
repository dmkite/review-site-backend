
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reviews', (table) => {
        table.increments();
        table.string('title').notNullable().defaultTo('');
        table.text('text').notNullable().defaultTo('');
        table.float('rating').notNullable().defaultTo(0);
        table.integer('snack_id').notNullable();
        table.foreign('snack_id').references('snacks.id');
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('users.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reviews')
};
