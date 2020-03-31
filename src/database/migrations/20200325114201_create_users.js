
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        
        table.integer('groupId').unsigned().notNullable();
        table.foreign('groupId').references('id').inTable('groups');
      });
  
};

exports.down = function(knex) {
   return knex.schema.dropTable('users');
};
