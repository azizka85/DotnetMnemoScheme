const { BaseLayout } = require('./base')

const { navigateHandler, loadLinkButtonClickHandlers, mountLinkButtonClickHandlers, unmountLinkButtonClickHandlers } = require('../../helpers/dom')
const { loadTranslation } = require('../../helpers/general')
const { changeLangPath } = require('../../helpers/request')
const { capitalize } = require('../../helpers/string')

const { languages } = require('../../globals')

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
   * @protected
   */
  node = null

  /**
   * @type {NodeListOf<HTMLElement>?}
   * @protected
   */
  languageButtons = null

  /**
   * @type {HTMLElement?}
   * @protected
   */
  navigationButton = null

  /**
   * @type {NodeListOf<HTMLElement>?}
   * @protected
   */
  cityButtons = null

  /**
   * @type {HTMLElement?}
   * @protected
   */
  routesButton = null

  /**
   * @type {NodeListOf<HTMLElement>?}
   * @protected
   */
  rangeButtons = null

  /**
   * @type {NodeListOf<HTMLElement>?}
   * @protected
   */
  routeButtons = null

  /**
   * @type {NodeListOf<HTMLElement>}
   * @protected
   */
  linkButtons = null

  /**
   * @type {HTMLElement?}
   */
  routesTxt = null

  /**
   * @type {HTMLElement?}
   */
  routeContent = null

  /**
   * @type {HTMLElement?}
   */
  routeTxt = null

  /**
   * @type {((event: MouseEvent) => void)[]}
   * @protected
   */
  linkButtonClickHandlers

  /**
   * @type {(event: MouseEvent) => void}
   */
  languageButtonClickHandler

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

  constructor() {
    super()
    this.languageButtonClickHandler = event => this.changeLanguage(event)
    this.linkButtonClickHandlers = []
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

    if(this.node) {
      this.languageButtons = this.node.querySelectorAll('[data-main-layout-language]')      
      this.navigationButton = this.node.querySelector('[data-main-layout-button="navigation"]')
      this.cityButtons = this.node.querySelectorAll('[data-main-layout-button="city"]')
      this.routesButton = this.node.querySelector('[data-main-layout-button="routes"]')
      this.rangeButtons = this.node.querySelectorAll('[data-main-layout-button="range"]')      
      this.routeButtons = this.node.querySelectorAll('[data-main-layout-route]')                        
      this.linkButtons = this.node.querySelectorAll('[data-main-layout-button]')       
      
      this.routesTxt = this.node.querySelector('[data-main-layout-text="routes"]')

      this.routeContent = this.node.querySelector('[data-main-layout-content="route"]')

      this.routeTxt = this.node.querySelector('[data-main-layout-text="route"]')
    }

    loadLinkButtonClickHandlers(this.linkButtons, this.linkButtonClickHandlers)

    return content
  }

  async mount() {
    if(this.languageButtons) {
      for(const languageButton of this.languageButtons) {
        languageButton.addEventListener('click', this.languageButtonClickHandler)
      }
    }    

    mountLinkButtonClickHandlers(this.linkButtons, this.linkButtonClickHandlers)

    await this.content?.mount?.()
  }

  async unmount() {
    if(this.languageButtons) {
      for(const languageButton of this.languageButtons) {
        languageButton.removeEventListener('click', this.languageButtonClickHandler)
      }
    }

    unmountLinkButtonClickHandlers(this.linkButtons, this.linkButtonClickHandlers)

    await this.content?.unmount?.()
  }

  /**
   * @param {string} lang 
   * @param {import('../../data/client-page').ClientPage} page 
   * @param {boolean} firstLoad 
   */
  async load(lang, page, firstLoad) {
    /**
     * @type {import('../../data/settings').Settings?}
     */
    const settings = window.mnemoScheme?.settings
    const pageRoot = settings?.pageRoot ?? '/'

    const city = page.match?.[1] || settings.defaultCity || 'almaty'

    const rangeBegin = page.match?.[2]
    const rangeEnd = page.match?.[3]

    const range = `${rangeBegin}-${rangeEnd}`

    const type = page.match?.[4]
    const route = page.match?.[5]

    const translator = languages[lang]

    if(!firstLoad) {
      if(this.languageButtons) {
        for(const languageButton of this.languageButtons) {
          const itemLang = languageButton.getAttribute('data-main-layout-language')
          const path = changeLangPath(page.fragment, itemLang)
    
          languageButton.setAttribute(
            'href',
            `${pageRoot + path + location.search}`
          )
  
          if(lang == itemLang) {
            languageButton.classList.remove('btn-light')
            languageButton.classList.add('btn-primary')
          } else {
            languageButton.classList.remove('btn-primary')
            languageButton.classList.add('btn-light')
          }
        }
      }      

      if(this.cityButtons) {
        for(const cityButton of this.cityButtons) {
          const itemCity = cityButton.getAttribute('data-main-layout-city')
  
          cityButton.setAttribute(
            'href',
            `${pageRoot + lang}/${itemCity + location.search}`
          )
  
          cityButton.textContent = translator.translate(capitalize(itemCity?.trim()))
  
          if(city == itemCity) {
            cityButton.classList.remove('btn-light')
            cityButton.classList.add('btn-primary')
          } else {
            cityButton.classList.remove('btn-primary')
            cityButton.classList.add('btn-light')
          }
        }
      }

      if(this.routesButton) {
        this.routesButton.setAttribute(
          'href',
          `${pageRoot + lang + location.search}`
        )

        this.routesButton.textContent = translator.translate('Routes')
      }

      if(this.routesTxt) {
        this.routesTxt.textContent = translator.translate('Routes')
      }

      if(this.rangeButtons) {
        for(const rangeButton of this.rangeButtons) {
          const itemRange = rangeButton.getAttribute('data-main-layout-range')

          rangeButton.setAttribute(
            'href',
            `${pageRoot + lang}/${city}/${itemRange + location.search}`
          )

          if(range == itemRange) {
            rangeButton.classList.remove('btn-light')
            rangeButton.classList.add('btn-primary')
          } else {
            rangeButton.classList.remove('btn-primary')
            rangeButton.classList.add('btn-light')
          }
        }
      }

      if(this.routeContent) {
        if(rangeBegin || rangeEnd) {
          this.routeContent.classList.remove('left-bar-content-hide')
        } else {
          this.routeContent.classList.add('left-bar-content-hide')
        }
      }

      if(this.routeTxt) {
        this.routeTxt.textContent = translator.translate('Select an appropriate route')
      }

      if(this.routeButtons) {
        for(const routeButton of this.routeButtons) {
          const icons = routeButton.getElementsByClassName('btn-icon')
          
          /**
           * @type {HTMLOrSVGElement?}
           */
          const icon = icons.length > 0 ? icons[0] : null


          const itemType = routeButton.getAttribute('data-main-layout-type')
          const itemRoute = routeButton.getAttribute('data-main-layout-route')
  
          routeButton.setAttribute(
            'href',
            `${pageRoot + lang}/${city}/${range}/${itemType}/${itemRoute + location.search}`
          )          
  
          if(type == itemType && route == itemRoute) {
            routeButton.classList.remove('btn-light')
            routeButton.classList.add('btn-primary')

            icon.classList.remove('btn-icon-light')
            icon.classList.add('btn-icon-primary')
          } else {
            routeButton.classList.remove('btn-primary')
            routeButton.classList.add('btn-light')

            icon.classList.remove('btn-icon-primary')
            icon.classList.add('btn-icon-light')
          }
        }
      }
    }
  }

  /**
   * Handle change language
   * @param {MouseEvent} event 
   */
  async changeLanguage(event) {
    event.preventDefault()

    /**
     * @type {string?}
     */
    const lang = event.target?.getAttribute?.('data-main-layout-language')

    // TODO: Need to change
    if(!lang) {
      throw new Error(`Language ${lang} is empty`)
    } else {
      if(!(lang in languages)) {
        await loadTranslation(lang)            
      }
      await navigateHandler(event)
    }
  }
}

module.exports = {
  MainLayout
}
