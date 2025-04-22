<script setup lang="ts">
import type { Status } from '~/utils/types';

useHead({
    link: [{
        rel: 'preload',
        as: 'image',
        href: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/8/82/Stone_Button_%28S%29_JE4.png',
    }],
});
const isDisabled = ref(false);
let data: Status | null = null;
let buttonPress: HTMLAudioElement, buttonUnpress: HTMLAudioElement;
if (import.meta.client) {
    buttonPress = new Audio('https://minecraft.wiki/images/Stone_button_press.ogg?e35bd&format=original');
    buttonUnpress = new Audio('https://minecraft.wiki/images/Stone_button_unpress.ogg?52860&format=original');
    const eventSource = new EventSource('/api/status');
    eventSource.onmessage = event => data = JSON.parse(event.data);
}
const disableWhitelist = async () => {
    const {status} = await $fetch.raw('/api/open', {method: 'POST'});
    if (status !== 201) return;
    isDisabled.value = true;
    buttonPress.play();
    setTimeout(async () => {
        isDisabled.value = false;
        buttonUnpress.play();
    }, 10_000);
}
</script>

<template>
    <NuxtRouteAnnouncer />
    <main>
        <ul class="sign">
            <li class="text" v-if="data" v-for="{id, name} in data.players.sample" :key="id">{{ name }}</li>
        </ul>
        <button @click="disableWhitelist" :disabled="isDisabled">
            <img
                :src="
                    isDisabled
                    ? 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/8/82/Stone_Button_%28S%29_JE4.png'
                    : 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3f/Stone_Button_%28item%29_JE1.png'
                "
            />
        </button>
        <div class="sign"><p class="text">{{isDisabled ? 'SERVIDOR DESTRANCADO POR 10 SEGUNDOS' : 'Aperte para destrancar'}}</p></div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: auto;
    flex-direction: column;
    > * {
        width: 165px;
        aspect-ratio: 1/1;
        vertical-align: middle;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding-inline-start: 0;
    }
    .text {
        list-style-type: square;
        text-align: center;
        color: black;
        font-size: 1.2rem;
        line-height: 1;
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
    @media screen and (min-aspect-ratio: 16/9) {
        gap: 1vw;
        > * {
            width: 10.3vw;
        }
    }
    @media screen and (min-width: 555px){
        gap: 1rem;
        flex-direction: row;
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