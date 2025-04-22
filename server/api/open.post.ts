import { Rcon } from "rcon-client"
import { useRcon } from "~/server/utils/rcon";

const waitThenClose = (rcon: Rcon) => new Promise((resolve) => {
    setTimeout(async () => {
        await rcon.send('whitelist on');
        resolve(true);
    }, 10_000);
});

export default defineEventHandler(async (event) => {
    const rcon = await useRcon();
    await rcon.send('whitelist off');
    event.waitUntil(waitThenClose(rcon));
    setResponseStatus(event, 201);
});