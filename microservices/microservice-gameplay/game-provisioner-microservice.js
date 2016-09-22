const seneca = require('seneca');
const gameProvisionerPlugin = require('./game-provisioner/index.js');

const gameProvisioner = seneca();
gameProvisioner.use(gameProvisionerPlugin);
