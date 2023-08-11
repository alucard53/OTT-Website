// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    plugins: ["~/server/index.ts"]
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    mongoUrl: "mongodb+srv://alucard23:Tr0069er@testcluster.aywezys.mongodb.net/?retryWrites=true&w=majority",
    stripePriv: "sk_test_51NdU4USA6MDXluwIvb7PI0qElTC5UcTFZmx0lkKjjH59KmeweAcqbFHqsrD9eYPYsasiH8tCA5RTKJLZ5nv7DwHL00sijDnVY4"
  }
})
