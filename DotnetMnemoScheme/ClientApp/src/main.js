const { Router, RouteNavigator } = require('@azizka/router')
const { PromiseQueue } = require('@azizka/promise-queue')

const { LoaderPage } = require('./views/pages/loader')

const { loadPage } = require('./helpers/view')

const { inject, languages } = require('./globals')

/**
 * @type {PromiseQueue<import('./data/task-data').TaskData>}
 */
const queue = new PromiseQueue()

window.addEventListener('DOMContentLoaded', () => {
  let firstTime = true

  LoaderPage.instance.init(null, firstTime)

  /**
   * @type {import('./data/settings').Settings?}
   */
  const settings = window.settings

  inject.localeRoute = `(${Object.keys(settings?.languages || {}).join('|')})`
  inject.router = new Router({ root: settings?.pageRoot || '/' })
  inject.routeNavigator = new RouteNavigator(inject.router)

  if(window.currentLang && window.currentLangData) {
    languages[window.currentLang] = window.currentLangData
  }

  const { localeRoute, router, routeNavigator } = inject

  router.addRoutes([{
    rule: `${localeRoute}?/?(list)?`,
    async handler(page) {
      queue.stop()
    
      loadPage(
        queue,
        page.match?.[0] || settings.defaultLanguage || 'ru',
        page, 
        'routes-list', 
        ['main'],
        firstTime
      )
    }
  }, {
    rule: `${localeRoute}/route/?(:num)?`,
    async handler(page) {
      queue.stop();

      loadPage(
        queue,
        page.match?.[0] || DEFAULT_LANGUAGE,
        page, 
        'routes-route', 
        ['main'], 
        firstTime
      )
    }
  }])

  routeNavigator.addUriListener();

  router
    .processUrl(routeNavigator.fragment, routeNavigator.query)
    .catch(
      reason => console.error(reason)      
    )
    .finally(() => firstTime = false);
})

