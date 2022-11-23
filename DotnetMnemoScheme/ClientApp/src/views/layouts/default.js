const { BaseLayout } = require('./base')

const { capitalize } = require('../../helpers/string')

const { languages } = require('../../globals')

/**
 * @implements {import('../view').View}
 */
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

  /**
   * @param {string} lang 
   * @param {import('../../data/client-page').ClientPage} page 
   * @param {boolean} firstLoad 
   */
   async load(lang, page, firstLoad) {
    const translator = languages[lang]

    const city = capitalize((page.match?.[1] || window.mnemoScheme?.settings?.defaultCity || 'almaty').trim())

    if(!firstLoad) {
      document.documentElement.lang = lang

      if(page.match && page.match[4] && page.match[5]) {        
        const type = capitalize(page.match[4].trim())
          
        document.title = `${translator.translate('CDC')} 2 - ${translator.translate('Route')} - ${translator.translate(city)} - ${translator.translate(type)} - ${page.match[5]}`       
      } else {
        document.title = `${translator.translate('CDC')} 2 - ${translator.translate('Routes')} - ${translator.translate(city)}`
      }
    }
  }
}

module.exports = {
  DefaultLayout
}
