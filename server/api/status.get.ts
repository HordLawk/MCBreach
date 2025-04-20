import protocol from 'minecraft-protocol';

const ping = () => {
    return new Promise((resolve, reject) => {
        protocol.ping({}, (err, res) => (err ? reject(err) : resolve(res)));
    });
}

export default defineEventHandler(async (event) => {
    const res = await ping();
    return res;
})
