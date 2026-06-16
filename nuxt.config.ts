export default defineNuxtConfig({
  compatibilityDate: '2026-06-16',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Shejire 2.0',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Напоминания, чтобы поддерживать связь с родственниками.' }
      ]
    }
  },
  nitro: {
    compatibilityDate: '2026-06-16'
  },
  typescript: {
    strict: true
  }
})