const { Translator } = require('@azizka/i18n')

const { layouts, languages } = require('../globals')

/**
 * @param {URLSearchParams} params 
 * @returns {{[key: string]: string | string[]}}
 */
 function groupParamsByKey(params) {
  return [...params.entries()].reduce((acc, tuple) => {
    const [key, val] = tuple

    if(acc.hasOwnProperty(key)) {
      if(Array.isArray(acc[key])) {
        acc[key].push(val)
      } else {
        acc[key] = [acc[key], val]
      }
    } else {
      acc[key] = val
    }

    return acc
  }, {})
}

/**
 * @param {number?} ms 
 * @returns {Promise<void>}
 */
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * @param {HTMLElement?} parent 
 * @param {boolean} firstTime 
 * @param {string[]} layoutNames 
 * @returns {Promise<HTMLElement>}
 */
async function loadContent(parent, firstTime, layoutNames) {
  /**
   * @type {HTMLElement}
   */
  let content

  if(firstTime || parent) {
    content = parent || document.body
  } else {
    let path = location.pathname + '?ajax=1&init=1&time=' + Date.now()

    const layoutNamesToLoad = []

    for(const layoutName of layoutNames) {
      if(!(layoutName in layouts)) {
        layoutNamesToLoad.push(layoutName)
      }
    }

    if(layoutNamesToLoad.length > 0) {
      path += '&layouts=' + layoutNamesToLoad.join(',')
    }

    const html = await (await fetch(path)).text()
    
    content = document.createElement('div')

    content.innerHTML = html
  }

  return content
}

/**
 * @param {string} lang 
 */
async function loadTranslation(lang) {
  /**
   * @type {import('../data/settings').Settings?}
   */
  const settings = window.mnemoScheme?.settings

  const pageRoot = settings?.pageRoot ?? '/'

  const res = await fetch(`${pageRoot}translation/${lang}?time=${Date.now()}`)

  if(res.status == 200) {
    /**
     * @type {import('@azizka/i18n/src/data/data-options').DataOptions}
     */
    const data = await res.json()

    languages[lang] = Translator.create(data)
  } else {
    /**
     * @type {import('../data/web-api-error').WebApiError}
     */
    const data = await res.json()

    throw new Error(data.message)
  }
}

module.exports = {
  groupParamsByKey,
  sleep,
  loadContent,
  loadTranslation
}
