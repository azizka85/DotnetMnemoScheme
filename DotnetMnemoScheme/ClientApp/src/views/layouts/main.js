const { BaseLayout } = require('./base')

const { navigateHandler, loadLinkButtonClickHandlers, mountLinkButtonClickHandlers, unmountLinkButtonClickHandlers } = require('../../helpers/dom')
const { loadTranslation } = require('../../helpers/general')
const { changeLangPath, toggleQueryParameter } = require('../../helpers/request')
const { capitalize } = require('../../helpers/string')

const { languages, queue } = require('../../globals')
const { TaskStatus } = require('../../data/task-status')

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
   * @type {HTMLElement?}
   * @protected
   */
  leftBar = null

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
   * @type {HTMLElement?}
   * @protected
   */
  resetButton = null

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
   * @protected
   */
  routesTxt = null

  /**
   * @type {HTMLElement?}
   * @protected
   */
  routeContent = null

  /**
   * @type {HTMLElement?}
   * @protected
   */
  routeTxt = null

  /**
   * @type {((event: MouseEvent) => void)[]}
   * @protected
   */
  linkButtonClickHandlers

  /**
   * TODO: If the content contains not only a text, then need to pass to the handler also the language button elem 
   * @type {(event: MouseEvent) => void}
   * @protected
   */
  languageButtonClickHandler

  /**
   * @type {((event: MouseEvent) => void)[]}
   * @protected
   */
  rangeButtonClickHandlers

  /**
   * @type {((event: MouseEvent) => void)[]}
   * @protected
   */
  routeButtonClickHandlers

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
    this.rangeButtonClickHandlers = []
    this.routeButtonClickHandlers = []
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
      this.leftBar = this.node.querySelector('[data-main-layout-panel="left-bar"]');

      this.languageButtons = this.node.querySelectorAll('[data-main-layout-language]')      
      this.navigationButton = this.node.querySelector('[data-main-layout-button="navigation"]')
      this.cityButtons = this.node.querySelectorAll('[data-main-layout-button="city"]')
      this.routesButton = this.node.querySelector('[data-main-layout-button="routes"]')
      this.resetButton = this.node.querySelector('[data-main-layout-link="reset"]')
      this.rangeButtons = this.node.querySelectorAll('[data-main-layout-range]')      
      this.routeButtons = this.node.querySelectorAll('[data-main-layout-route]')                        
      this.linkButtons = this.node.querySelectorAll('[data-main-layout-button]')       
      
      this.routesTxt = this.node.querySelector('[data-main-layout-text="routes"]')

      this.routeContent = this.node.querySelector('[data-main-layout-content="route"]')

      this.routeTxt = this.node.querySelector('[data-main-layout-text="route"]')
    }

    loadLinkButtonClickHandlers(this.linkButtons, this.linkButtonClickHandlers)
    loadLinkButtonClickHandlers(this.rangeButtons, this.rangeButtonClickHandlers)
    loadLinkButtonClickHandlers(this.routeButtons, this.routeButtonClickHandlers)

    return content
  }

  async mount() {
    if(this.languageButtons) {
      for(const languageButton of this.languageButtons) {
        languageButton.addEventListener('click', this.languageButtonClickHandler)
      }
    }    

    mountLinkButtonClickHandlers(this.linkButtons, this.linkButtonClickHandlers)
    mountLinkButtonClickHandlers(this.rangeButtons, this.rangeButtonClickHandlers)
    mountLinkButtonClickHandlers(this.routeButtons, this.routeButtonClickHandlers)

    await this.content?.mount?.()
  }

  async unmount() {
    if(this.languageButtons) {
      for(const languageButton of this.languageButtons) {
        languageButton.removeEventListener('click', this.languageButtonClickHandler)
      }
    }

    unmountLinkButtonClickHandlers(this.linkButtons, this.linkButtonClickHandlers)
    unmountLinkButtonClickHandlers(this.rangeButtons, this.rangeButtonClickHandlers)
    unmountLinkButtonClickHandlers(this.routeButtons, this.routeButtonClickHandlers)    

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

    const navigation = page.query.navigation === '1'

    const city = page.match?.[1] || settings.defaultCity || 'almaty'

    const rangeBegin = page.match?.[2]
    const rangeEnd = page.match?.[3]

    const range = `${rangeBegin}-${rangeEnd}`

    const type = page.match?.[4]
    const route = page.match?.[5]

    const translator = languages[lang]

    if(!firstLoad) {
      if(this.leftBar) {
        if(navigation) {
          this.leftBar.classList.add('left-bar-open')
        } else {
          this.leftBar.classList.remove('left-bar-open')
        }
      }

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
      
      if(this.navigationButton) {
        this.navigationButton.setAttribute(
          'href',
          `${pageRoot + page.fragment}?${toggleQueryParameter(page.query, 'navigation')}`
        )
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

      if(this.resetButton) {
        this.resetButton.setAttribute(
          'href',
          `${pageRoot + lang}/${city + location.search}`
        )

        this.resetButton.textContent = translator.translate('Reset')

        if(!rangeBegin && !rangeEnd) {
          this.resetButton.classList.add('link-hide')
        } else {
          this.resetButton.classList.remove('link-hide')          
        }
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

            if(icon) {
              icon.classList.remove('btn-icon-light')
              icon.classList.add('btn-icon-primary')
            }
          } else {
            routeButton.classList.remove('btn-primary')
            routeButton.classList.add('btn-light')

            if(icon) {
              icon.classList.remove('btn-icon-primary')
              icon.classList.add('btn-icon-light')
            }
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

    queue.addTask(async (data) => {
      try {
        if(!lang) {
          throw new Error(`Language ${lang} is empty`)
        } else {
          if(!(lang in languages)) {
            await loadTranslation(lang)            
          }      
        }
        data = {
          status: TaskStatus.completed
        }
      } catch(err) {
        data = {
          status: TaskStatus.error,
          data: err
        }
      }

      return data
    })    

    queue.addTask(async (data) => {
      if(!data || data.status == TaskStatus.completed) {
        await navigateHandler(event)
      } else if(data?.status === TaskStatus.error) {
        // TODO: Need to change
        console.error(data?.data)
      }
    })
  }
}

module.exports = {
  MainLayout
}
