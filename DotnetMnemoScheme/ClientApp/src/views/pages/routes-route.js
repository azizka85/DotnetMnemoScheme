const { loadContent } = require('../../helpers/general')

/**
 * @implements {import('../view').View}
 */
 class RoutesRoutePage {
  /**
   * Single instance of this
   * @type {RoutesRoutePage?}
   * @protected
   */
  static page = null  

  /**
   * @type {HTMLElement?}
   */
  node = null

  /**
   * @returns {RoutesRoutePage}
   */
  static get instance() {
    if(!RoutesRoutePage.page) {
      RoutesRoutePage.page = new RoutesRoutePage()
    }

    return RoutesRoutePage.page
  }

  /**
   * @returns {HTMLElement?}
   */
  get elem() {
    return this.node
  }

  /**
   * @param {HTMLElement?} parent 
   * @param {boolean} firstTime 
   * @returns {Promise<HTMLElement>}
   */
  async init(parent, firstTime) {    
    let content = await loadContent(parent, firstTime, ['main'])

    this.node = content.querySelector('[data-page="routes-route-page"]')

    return content
  }

  async mount() {}

  async unmount() {}

  /**
   * @param {string} lang 
   * @param {import("../../data/client-page").ClientPage} page 
   * @param {boolean} firstLoad 
   */
  async load(lang, page, firstLoad) {
    console.log(lang, page, firstLoad)
  }
}

module.exports = {
  RoutesRoutePage
}
