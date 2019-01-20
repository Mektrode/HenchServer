const authResolver = require('./auth');
const statsResolver = require('./stats');
const consumableResolver = require('./consumable');

const rootResolver = {
  ...authResolver,
  ...statsResolver,
  ...consumableResolver
};

module.exports = rootResolver;