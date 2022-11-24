const { Router, RouteNavigator } = require('@azizka/router')
const { PromiseQueue } = require('@azizka/promise-queue')
const { Translator } = require('@azizka/i18n')

const { BaseLayout } = require('./views/layouts/base')

const inject = {
  /**
   * @type {Router<import('./data/route-options').RouteOptions, import('./data/route-state').RouteState>?}
   */
  router: null,

  /**
   * @type {RouteNavigator<import('./data/route-options').RouteOptions, import('./data/route-state').RouteState>?}
   */
  routeNavigator: null,

  /**
   * @type {string | RegExp}
   */
  localeRoute: '^(kk|ru|en)',
}

/**
 * @type {{[key: string]: import('./views/view').View}}
 */
const views = {}

/**
 * @type {{[key: string]: BaseLayout & import('./views/view').View}}
 */
const layouts = {}

/**
 * @type {{[key: string]: Translator}}
 */
const languages = {}

/**
 * @type {PromiseQueue<import('./data/task-data').TaskData>}
 */
 const queue = new PromiseQueue()

module.exports = {
  inject,
  views,
  layouts,
  languages,
  queue
}
