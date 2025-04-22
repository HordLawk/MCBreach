import { Rcon } from "rcon-client"

let rcon: Rcon | null = null;

export const useRcon = async () => {
    if(!rcon){
        const runtimeConfig = useRuntimeConfig();
        rcon = await Rcon.connect({
            host: "localhost",
            password: runtimeConfig.rconPassword,
        });
    }
    return rcon;
}