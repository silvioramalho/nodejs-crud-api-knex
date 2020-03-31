const knex = require('knex');
const configuration = require('../../knexfile'); // de acordo com o diretorio onde está o arquivo

const connection = knex(configuration.development);

module.exports = connection;
