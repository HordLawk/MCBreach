import { Rcon } from "rcon-client"

const waitThenClose = (rcon: Rcon) => new Promise((resolve) => {
    setTimeout(async () => {
        await rcon.send('whitelist on');
        resolve(true);
    }, 10000);
});

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event);
    const rcon = await Rcon.connect({
        host: "localhost",
        password: runtimeConfig.rconPassword,
    });
    await rcon.send('whitelist off');
    event.waitUntil(waitThenClose(rcon));
    setResponseStatus(event, 201);
});