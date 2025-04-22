export type Status = {
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