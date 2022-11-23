const { PromiseQueue } = require('@azizka/promise-queue')

const { TaskStatus } = require('../data/task-status')

const { DefaultLayout } = require('../views/layouts/default')

const { LoaderPage } = require('../views/pages/loader')

const { toCamel } = require('./string')
const { loadTranslation } = require('./general')

const { layouts, languages, views } = require('../globals')

function hideSplash() {
  const splashElem = document.getElementById('splash')

  splashElem?.classList.remove('splash-open')
}

/**
 * @param {string[]} layouts 
 * @returns {import('../views/layouts/base').BaseLayout}
 */
function getExistingLayout(layoutNames) {
  const reverseLayoutNames = [...layoutNames].reverse()

  /**
   * @type {import('../views/layouts/base').BaseLayout}
   */
  let layout = DefaultLayout.instance

  for(const layoutName of reverseLayoutNames) {
    if(!(layoutName in layouts) || layout['content'] !== layouts[layoutName]) {      
      break
    }

    layout = layouts[layoutName]
  }

  return layout
}

/**
 * @param {string[]} layoutNames 
 * @param {HTMLElement?} parent 
 * @param {boolean} firstTime 
 * @returns {{[key: string]: boolean}}
 */
async function initLayouts(layoutNames, parent, firstTime) {
  /**
   * @type {{[key: string]: boolean}}
   */
  const firstLoad = {}

  for(const layoutName of layoutNames) {
    if(!(layoutName in layouts)) {
      const module = (await import(`./views/layouts/${layoutName}.js`)).default

      parent = await module[toCamel(`${layoutName}-layout`)]?.instance?.init?.(parent, firstTime)

      layouts[layoutName] = module[toCamel(`${layoutName}-layout`)]?.instance

      firstLoad[layoutName] = true
    }
  }

  return firstLoad
}

/**
 * @param {string} lang 
 * @param {import('../data/client-page').ClientPage} page 
 * @param {string[]} layoutNames 
 * @param {{[key: string]: boolean}} firstLoad 
 * @param {boolean} firstTime
 * @returns {Promise<import('../views/layouts/base').BaseLayout>}
 */
async function loadLayouts(lang, page, layoutNames, firstLoad, firstTime) {
  const reverseLayoutNames = [...layoutNames].reverse()

  let parentLayout = DefaultLayout.instance

  parentLayout.load(lang, page, firstTime)

  for(const layoutName of reverseLayoutNames) {
    if(parentLayout['content'] !== layouts[layoutName]) {
      await parentLayout.replaceContent(layouts[layoutName])
    }

    await layouts[layoutName].load?.(lang, page, firstLoad[layoutName] ?? false)

    parentLayout = layouts[layoutName]
  } 
  
  return parentLayout
}

/**
 * @param {PromiseQueue<import('../data/task-data').TaskData>} queue 
 * @param {string} lang 
 * @param {import('../data/client-page').ClientPage} page 
 * @param {string} name 
 * @param {string[]} layoutNames 
 * @param {boolean} firstTime 
 */
function loadPage(queue, lang, page, name, layoutNames, firstTime) {
  /**
   * @type {HTMLElement?}
   */
  let parent = null

  let pageFirstLoad = false

  queue.addTask(async () => {
    if(!firstTime && (!(lang in languages) || !(name in views))) {
      const layout = getExistingLayout(layoutNames)
  
      if(layout['content'] !== LoaderPage.instance) {
        await layout.replaceContent(LoaderPage.instance)
      }
    } 

    return {
      status: TaskStatus.completed
    }
  })

  queue.addTask(async (data) => {
    if((!data || data.status === TaskStatus.completed) && !(lang in languages)) {
      try {
        await loadTranslation(lang)

        data = {
          status: TaskStatus.completed          
        }
      } catch(err) {
        data = {
          status: TaskStatus.error,
          data: err
        }
      }
    }

    return data
  })

  queue.addTask(async (data) => {
    if((!data || data.status === TaskStatus.completed) && !(name in views)) {       
      try {
        const module = (await import(`./views/pages/${name}.js`)).default
  
        parent = await module[toCamel(`${name}-page`)]?.instance?.init?.(parent, firstTime)
    
        views[name] = module[toCamel(`${name}-page`)]?.instance
    
        pageFirstLoad = true

        data = {
          status: TaskStatus.completed
        }
      } catch(err) {
        data = {
          status: TaskStatus.error,
          data: err
        }
      }
    }

    return data
  })

  queue.addTask(async (data) => {
    if(!data || data.status === TaskStatus.completed) {
      try {
        const firstLoad = await initLayouts(layoutNames, parent, firstTime)

        data = {
          status: TaskStatus.completed,
          data: firstLoad
        }
      } catch(err) {
        data = {
          status: TaskStatus.error,
          data: err
        }
      }
    }

    return data
  })

  queue.addTask(async (data) => {
    if(!data || data.status === TaskStatus.completed) {
      try {
        /**
         * @type {{[key: string]: boolean}}
         */
        const firstLoad = data.data        
        
        const layout = await loadLayouts(lang, page, layoutNames, firstLoad, firstTime)    
    
        if(layout['content'] !== views[name]) {
          await layout.replaceContent(views[name])
        }
    
        await views[name].load?.(lang, page, pageFirstLoad)

        data = {
          status: TaskStatus.completed
        }
      } catch(err) {
        data = {
          status: TaskStatus.error,
          data: err
        }
      }
    }

    return data
  })

  queue.addTask(async (data) => {
    if(firstTime) {
      hideSplash()
    }

    if(data?.status === TaskStatus.error) {
      /// TODO: Need to change
      console.error(data.data)      
    }
  })
}

module.exports = {
  getExistingLayout,
  initLayouts,
  loadLayouts,
  loadPage  
}
