// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    css: ['~/assets/css/main.css'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },

    app: {
      head: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
      }
    },

    runtimeConfig: {
      public: {
        clientId: process.env.SPOTIFY_API_CLIENT,
        clientSecret: process.env.SPOTIFY_API_KEY
      }
    },

})
