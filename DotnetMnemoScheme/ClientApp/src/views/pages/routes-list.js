const { loadContent } = require('../../helpers/general')

/**
 * @implements {import('../view').View}
 */
class RoutesListPage {
  /**
   * Single instance of this
   * @type {RoutesListPage?}
   * @protected
   */
  static page = null  

  /**
   * @type {HTMLElement?}
   */
  node = null

  /**
   * @returns {RoutesListPage}
   */
  static get instance() {
    if(!RoutesListPage.page) {
      RoutesListPage.page = new RoutesListPage()
    }

    return RoutesListPage.page
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
  RoutesListPage
}
