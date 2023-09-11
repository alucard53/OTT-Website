// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt'
    ],
    runtimeConfig: {
        stripePriv: "sk_test_51NdU4USA6MDXluwIvb7PI0qElTC5UcTFZmx0lkKjjH59KmeweAcqbFHqsrD9eYPYsasiH8tCA5RTKJLZ5nv7DwHL00sijDnVY4"
    }
})
