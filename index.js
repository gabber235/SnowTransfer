const Snowtransfer = require('./src/SnowTransfer');

/**
 * Create a new SnowTransfer instance
 * @param {Object|Array|any} args - arguments that should be passed to SnowTransfer
 * @return {SnowTransfer}
 * @constructor
 */
function createSnowTransfer(...args) {
    return new Snowtransfer(...args);
}

createSnowTransfer.SnowTransfer = Snowtransfer;
module.exports = createSnowTransfer;