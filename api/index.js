const routes = require('./routes');
const content = require('./content/index');
const bridges = require('./bridges/index');
const settings = require('./settings/index');
const translates = require('./translates/index');
const unitFields = require('./unitFields/index');
const units = require('./units/index');
const users = require('./users/index');
const auth = require('./auth/index');

module.exports = {
  routes,
  content,
  bridges,
  settings,
  translates,
  unitFields,
  units,
  users,
  auth   
};