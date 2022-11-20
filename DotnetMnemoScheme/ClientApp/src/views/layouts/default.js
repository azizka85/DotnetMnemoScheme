const { BaseLayout } = require('./base')

class DefaultLayout extends BaseLayout {
  /**
   * Single instance of Default layout
   * @type {DefaultLayout?}
   * @protected
   */
  static layout = null

  static get instance() {
    if(!DefaultLayout.layout) {
      DefaultLayout.layout = new DefaultLayout()
    }
    return DefaultLayout.layout
  }
}

module.exports = {
  DefaultLayout
}
