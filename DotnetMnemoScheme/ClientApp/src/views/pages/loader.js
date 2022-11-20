/**
 * @implements {import('../view').View}
 */
class LoaderPage {
  /**
   * @type {LoaderPage?}
   * @protected
   */
  static page = null  

  /**
   * @type {HTMLElement?}
   * @protected
   */
  node = null

  /**
   * @returns {LoaderPage}
   */
  static get instance() {
    if(!LoaderPage.page) {
      LoaderPage.page = new LoaderPage()
    }

    return LoaderPage.page
  }

  /**
   * @type {HTMLElement?}
   */
  get elem() {
    return this.node
  }

  /**
   * @param {HTMLElement?} parent 
   * @param {boolean} firstTime 
   * @returns {HTMLElement}
   */
  async init(parent, firstTime) {
    let content = parent || document.body

    this.node = content.querySelector('[data-page="loader-page"]')

    return content
  }
}

module.exports = {
  LoaderPage
}
