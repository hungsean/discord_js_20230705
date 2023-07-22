const controller = require('../../interactionCreateCommands/rank/index.js');

module.exports = {
    data: 
    {
        name: 'rankCheck',
    },
    async execute(message) {
        console.log(`[debug] rankStarted = ${controller.rankStarted}`)
        if (controller.rankStarted === false) return;
        console.log(`[info] messageCreate: rankCheck`)
    },
};
