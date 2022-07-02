module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('ready')
        client.user.setActivity('the server', { type: 'WATCHING' });
    }
}