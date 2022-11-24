const { Router, RouteNavigator } = require('@azizka/router')
const { Translator } = require('@azizka/i18n')

const { LoaderPage } = require('./views/pages/loader')

const { loadPage } = require('./helpers/view')

const { inject, languages, queue } = require('./globals')

window.addEventListener('DOMContentLoaded', () => {
  let firstTime = true

  LoaderPage.instance.init(null, firstTime)

  /**
   * @type {import('./data/settings').Settings?}
   */
  const settings = window.mnemoScheme?.settings

  inject.localeRoute = settings?.langRoute
  inject.router = new Router({ root: settings?.pageRoot || '/' })
  inject.routeNavigator = new RouteNavigator(inject.router)

  if(window.mnemoScheme?.currentLang && window.mnemoScheme?.currentLangData) {
    languages[window.mnemoScheme.currentLang] = Translator.create(window.mnemoScheme.currentLangData)
  }

  const { localeRoute, router, routeNavigator } = inject

  router.addRoutes([{
    rule: `${localeRoute}?/?(:word)?/?(:num)?-?(:num)?/?(:word)?/?(:num)?`,
    async handler(page) {
      queue.stop()
    
      loadPage(
        page.match?.[0] || settings.defaultLanguage || 'ru',
        page, 
        'routes', 
        ['main'],
        firstTime
      )
    }
  }])

  routeNavigator.addUriListener()

  router
    .processUrl(routeNavigator.fragment, routeNavigator.query)
    .catch(
      reason => console.error(reason)      
    )
    .finally(() => firstTime = false)
})

