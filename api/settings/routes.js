const Settings = require('./model');
const router = require('../router/router');

module.exports = router.defineCRUDRoutes(Settings);