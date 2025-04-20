<script setup>
const {data} = useFetch('/api/status', {pick: ['players']});
const isDisabled = ref(false);
let buttonPress, buttonUnpress;
if (import.meta.client) {
    buttonPress = new Audio('https://minecraft.wiki/images/Stone_button_press.ogg?e35bd&format=original');
    buttonUnpress = new Audio('https://minecraft.wiki/images/Stone_button_unpress.ogg?52860&format=original');
}
const disableWhitelist = async () => {
    buttonPress.play();
    const {status} = await $fetch.raw('/api/open', {method: 'POST'});
    if (status !== 201) return;
    isDisabled.value = true;
    setTimeout(() => {
        buttonUnpress.play();
        isDisabled.value = false;
    }, 10000);
}
</script>

<template>
    <NuxtRouteAnnouncer />
    <main>
        <ul class="sign">
            <li v-for="{id, name} in data.players.sample" :key="id">{{ name }}</li>
        </ul>
        <button @click="disableWhitelist" :disabled="isDisabled"><img :src="isDisabled ? 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/8/82/Stone_Button_%28S%29_JE4.png' : 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3f/Stone_Button_%28item%29_JE1.png'"/></button>
        <div class="sign"><p>{{isDisabled ? 'SERVIDOR DESTRANCADO POR 10 SEGUNDOS' : 'Aperte para destrancar'}}</p></div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 33vw;
    margin: auto;
    gap: 1rem;
    > * {
        width: 100%;
        text-align: center;
        color: black;
        font-size: 1.3rem;
        padding-inline-start: 0;
        aspect-ratio: 1/1;
        vertical-align: middle;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    > .sign {
        background-image: url('https://i.pinimg.com/736x/3e/25/e8/3e25e8ef0194063a4b39cb2c1fabd1d1.jpg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    > button {
        background: none;
        border: none;
    }
}
</style>

<style>
* {
    cursor: crosshair;
    font-family: 'Minecraft', sans-serif;
}

body {
    background-image: url('~/assets/wallpaper.png');
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    margin: 0;
}

@font-face {
    font-family: 'Minecraft';
    src: url('/MinecraftRegular.otf') format('opentype');
}
</style>