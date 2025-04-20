import protocol from 'minecraft-protocol';

type Status = {
    isModded: boolean;
    version: {
        name: string;
        protocol: number;
    };
    players: {
        max: number;
        online: number;
        sample?: {
            name: string,
            id: string,
        }[];
    };
    description: string;
    favicon?: string;
    latency: number;
}

const ping = () => {
    return new Promise((resolve, reject) => {
        protocol.ping({}, (err, res) => (err ? reject(err) : resolve(res)));
    });
}

export default defineEventHandler(async (event) => {
    const res = await ping() as Status;
    return res;
})
