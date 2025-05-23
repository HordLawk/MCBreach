// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/image'],
  app: {
    head: {
      title: 'minaca', // default fallback title
      htmlAttrs: {
        lang: 'pt',
      },
    },
  },
  runtimeConfig: {
    rconPassword: process.env.NUXT_RCON_PASSWORD ?? '',
  },
})