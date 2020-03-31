const crypto = require('crypto');
const connection = require('../database/conn');

module.exports = {
  async index(request, response) {
    const { id } = request.params;
    try {
      const user = await connection('users')
        .join('groups', 'groups.id', '=', 'users.groupId')
        .where({ 'users.id': id })
        .first({
          id: 'users.id',
          name: 'users.name',
          email: 'users.email',
          city: 'users.city',
          uf: 'users.uf',
          groupId: 'groups.id',
          groupName: 'groups.name'
        });
      if (user) return response.json(user);
      else return response.status(404).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async list(request, response) {
    const { page = 1, offset } = request.query;

    try {
      if (offset) {
        const [count] = await connection('users').count('*');
        const users = await connection('users')
          .join('groups', 'groups.id', '=', 'users.groupId')
          .limit(offset)
          .offset((page - 1) * offset)
          .select([
            {
              id: 'users.id',
              name: 'users.name',
              email: 'users.email',
              city: 'users.city',
              uf: 'users.uf',
              groupId: 'groups.id',
              groupName: 'groups.name'
            }
          ]);
        return response.json({
          count: count['count(*)'],
          page,
          items: users
        });
      } else {
        const users = await connection('users')
          .join('groups', 'groups.id', '=', 'users.groupId')
          .select('users.*', 'groups.*');
        return response.json(users);
      }
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async create(request, response) {
    const { name, email, city, uf, groupId } = request.body;

    const id = crypto.randomBytes(8).toString('HEX');

    try {
      await connection('users').insert({
        id,
        name,
        email,
        city,
        uf,
        groupId
      });

      return response.json({ id });
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { name, email, city, uf, groupId } = request.body;

    try {
      const user = await connection('users')
        .where({ id: id })
        .update({
          name,
          email,
          city,
          uf,
          groupId
        });

      if (user) return response.status(204).send();
      else return response.status(404).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      const user = await connection('users')
        .where({ id })
        .delete();

      if (user) return response.status(204).send();
      else return response.status(404).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }
};
