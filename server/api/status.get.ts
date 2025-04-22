import protocol from 'minecraft-protocol';
import type { Status } from '~/utils/types';

const ping = () => {
    return new Promise((resolve, reject) => {
        protocol.ping({}, (err, res) => (err ? reject(err) : resolve(res)));
    });
}

export default defineEventHandler(async (event) => {
    const eventStream = createEventStream(event);
    const pushToStream = async () => {
        const res = await ping() as Status;
        await eventStream.push(JSON.stringify(res));
    }
    pushToStream();
    const interval = setInterval(pushToStream, 10_000);
    eventStream.onClosed(async () => {
        clearInterval(interval);
        await eventStream.close();
    });
    return eventStream.send();
})
