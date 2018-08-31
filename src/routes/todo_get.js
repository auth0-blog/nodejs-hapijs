const Joi = require('joi');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/todo',
  options: {
    auth: 'jwt',
    validate: {
      query: {
        start: Joi.number().min(0).default(0).notes('Start index of results inclusive'),
        results: Joi.number().min(1).max(100).default(10).notes('Number of results to return'),
      },
    },
    description: 'Get items',
    notes: 'Get items from todo list paged',
    tags: ['api'],
  },
  handler: async (request, h) => {
    let {fakeDb} = request.server.app;
    let {sub} = request.auth.credentials;
    let {start, results} = request.query;

    if (!fakeDb[sub]) fakeDb[sub] = [];

    try {

      let value = fakeDb[sub].slice(start, start + results);
      let count = fakeDb[sub];

      if (!value) value = [];

      return h.response({
        nextlink: `${request.url.pathname}?start=${start + results}&results=${results}`,
        value,
        count
      });
    } catch (e) {
      return Boom.badImplementation(e);
    }
  }
};
