<script setup>
const {data} = useFetch('/api/status');
const isDisabled = ref(false);
const disableWhitelist = async () => {
    const {status} = await $fetch.raw('/api/open', {method: 'POST'});
    if (status !== 201) return;
    isDisabled.value = true;
    setTimeout(() => (isDisabled.value = false), 10000);
}
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />
        <pre>{{ data }}</pre>
        <button @click="disableWhitelist" :disabled="isDisabled">Desativar whitelist</button>
        <p v-if="isDisabled">SERVIDOR ABERTO! VOCE TEM 10 SEGUNDOS PRA ENTRAR</p>
    </div>
</template>
