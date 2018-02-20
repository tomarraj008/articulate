'use strict';
const Boom = require('boom');
const Flat = require('flat');

module.exports = (request, reply) => {

    const agentId = request.params.id;
    const redis = request.server.app.redis;

    redis.hgetall(`agentWebhook:${agentId}`, (err, data) => {

        if (err){
            const error = Boom.badImplementation('An error occurred retrieving the webhook.');
            return reply(error);
        }
        if (data){
            return reply(null, Flat.unflatten(data));
        }
        const error = Boom.notFound('The specified webhook doesn\'t exists');
        return reply(error);
    });

};
