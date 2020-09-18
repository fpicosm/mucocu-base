module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'manual',
      rtlSupport: true
    },
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}
