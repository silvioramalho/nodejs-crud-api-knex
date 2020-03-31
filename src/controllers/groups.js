const connection = require('../database/conn');

module.exports = {
  async index(request, response) {
    const { id } = request.params;
    try {
      const group = await connection('groups')
        .where({ id })
        .first('*');
      if (group) return response.json(group);
      else return response.status(404).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async list(request, response) {
    const { page = 1, offset } = request.query;
    try {
      if (offset) {
        const [count] = await connection('groups').count('*');
        const groups = await connection('groups')
          .limit(offset)
          .offset((page - 1) * offset)
          .select('*');
        return response.json({
          count: count['count(*)'],
          page,
          items: groups
        });
      } else {
        const groups = await connection('groups').select('*');
        return response.json(groups);
      }
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async create(request, response) {
    const { name } = request.body;

    try {
      const [id] = await connection('groups').insert({
        name
      });

      return response.json({ id });
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    try {
      const group = await connection('groups')
        .where({ id: id })
        .update({
          name: name
        });

      if (group) return response.status(204).send();
      else return response.status(404).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      const group = await connection('group')
        .where({ id })
        .delete();

      if (group) return response.status(204).send();
      else return response.status(404).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }
};
