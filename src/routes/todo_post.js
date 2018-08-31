const Joi = require('joi');
const Boom = require('boom');

module.exports = {
  method: 'POST',
  path: '/todo',
  options: {
    auth: 'jwt',
    validate: {
      payload: {
        item: Joi.string().required().notes('Text to store in list')
      },
    },
    description: 'Add item',
    notes: 'Add an item to the list',
    tags: ['api'],
  },
  handler: async (request, h) => {
    let {sub} = request.auth.credentials;
    let {item} = request.payload;
    let {fakeDb} = request.server.app;

    if (!fakeDb[sub]) fakeDb[sub] = [];

    try {
      fakeDb[sub].push(item);

      return h.response({
        count: fakeDb[sub].length
      }).code(201);

    } catch (e) {
      return Boom.badImplementation(e);
    }
  }
};
