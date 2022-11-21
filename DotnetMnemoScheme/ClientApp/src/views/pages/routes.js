const { loadContent } = require('../../helpers/general')

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
   */
  node = null

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

  /**
   * @param {HTMLElement?} parent 
   * @param {boolean} firstTime 
   * @returns {Promise<HTMLElement>}
   */
  async init(parent, firstTime) {
    let content = await loadContent(parent, firstTime, ['main'])

    this.node = content.querySelector('[data-page="routes-list-page"]')

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
  RoutesPage
}
