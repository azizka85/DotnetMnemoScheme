const { loadContent } = require('../../helpers/general')
const { setQueryParameter } = require('../../helpers/request')
const { loadLinkButtonClickHandlers, mountLinkButtonClickHandlers, unmountLinkButtonClickHandlers } = require('../../helpers/dom')

/**
 * @implements {import('../view').View}
 */
class RoutesPage {
  /**
   * Single instance of this
   * @type {RoutesPage?}
   * @protected
   */
  static page = null  

  /**
   * @type {HTMLElement?}
   * @protected
   */
  node = null

  /**
   * @type {HTMLElement?}
   * @protected
   */
  navigationButton = null

  /**
   * @type {NodeListOf<HTMLElement>?}
   * @protected
   */
  linkButtons

  /**
   * @type {((event: MouseEvent) => void)[]}
   * @protected
   */
  linkButtonClickHandlers

  /**
   * @returns {RoutesPage}
   */
  static get instance() {
    if(!RoutesPage.page) {
      RoutesPage.page = new RoutesPage()
    }

    return RoutesPage.page
  }

  /**
   * @returns {HTMLElement?}
   */
  get elem() {
    return this.node
  }

  constructor() {
    this.linkButtonClickHandlers = []
  }

  /**
   * @param {HTMLElement?} parent 
   * @param {boolean} firstTime 
   * @returns {Promise<HTMLElement>}
   */
  async init(parent, firstTime) {
    let content = await loadContent(parent, firstTime, ['main'])

    this.node = content.querySelector('[data-page="routes-page"]')

    if(this.node) {
      this.navigationButton = this.node.querySelector('[data-routes-page-button="navigation"]')
      
      this.linkButtons = this.node.querySelectorAll('[data-routes-page-button]')
    }

    loadLinkButtonClickHandlers(this.linkButtons, this.linkButtonClickHandlers)

    return content
  }

  async mount() {
    mountLinkButtonClickHandlers(this.linkButtons, this.linkButtonClickHandlers)
  }

  async unmount() {
    unmountLinkButtonClickHandlers(this.linkButtons, this.linkButtonClickHandlers)
  }

  /**
   * @param {string} lang 
   * @param {import("../../data/client-page").ClientPage} page 
   * @param {boolean} firstLoad 
   */
  async load(lang, page, firstLoad) {
    if(this.navigationButton) {
      this.navigationButton.setAttribute(
        'href',
        `${location.pathname}?${setQueryParameter(page.query, 'navigation', '1')}`
      )
    }
  }
}

module.exports = {
  RoutesPage
}
