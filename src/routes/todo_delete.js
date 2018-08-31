const Joi = require('joi');
const Boom = require('boom');

module.exports = {
  method: 'DELETE',
  path: '/todo',
  options: {
    auth: 'jwt',
    validate: {
      payload: {
        index: Joi.number().min(0).required().notes('Index to delete'),
      },
    },
    description: 'Delete item',
    notes: 'Delete an item from the todo list',
    tags: ['api'],
  },
  handler: async (request, h) => {
    let {sub} = request.auth.credentials;
    let {index} = request.payload;
    let {fakeDb} = request.server.app;

    if (!fakeDb[sub]) fakeDb[sub] = [];

    try {
      fakeDb[sub].splice(index, 1);

      return h.response({}).code(200);
    } catch (e) {
      return Boom.badImplementation(e);
    }
  }
};
