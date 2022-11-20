const { BaseLayout } = require('./base')

/**
 * @implements {import('../view').View}
 */
class MainLayout extends BaseLayout {
  /**
   * Single instance of Main layout
   * @type {MainLayout?}
   * @protected
   */
  static layout = null

  /**
   * @type {HTMLElement?}
   */
  node = null

  /**
   * @type {MainLayout}
   */
  static get instance() {
    if(!MainLayout.layout) {
      MainLayout.layout = new MainLayout()
    }

    return MainLayout.layout
  }

  /**
   * @returns {HTMLElement?}
   */
  get elem() {
    return this.node
  }

  /**
   * Initialize all elements of this layout
   * @param {HTMLElement?} parent 
   * @param {boolean} firstTime 
   * @returns {Promise<HTMLElement>}
   */
  async init(parent, firstTime) {
    let content = parent || document.body

    this.node = content.querySelector('[data-layout="main-layout"]')

    return content
  }

  async mount() {
    await this.content?.mount?.()
  }

  async unmount() {
    await this.content?.unmount?.()
  }

  /**
   * @param {string} lang 
   * @param {import('../../data/client-page').ClientPage} page 
   * @param {boolean} firstLoad 
   */
  async load(lang, page, firstLoad) {
    console.log(lang, page, firstLoad, this.node, this.content)
  }
}

module.exports = {
  MainLayout
}
