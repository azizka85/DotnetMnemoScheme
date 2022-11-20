const { trimSlashes } = require('@azizka/router')

const { inject } = require('../globals')

/**
 * Get query string from dictionary
 * @param {{[key: string]: string}} query 
 * @returns {string}
 */
 function getQueryParameters(query) {
  return Object.keys(query).map(key => {
    if(query[key]) {
      return `${key}=${query[key]}`
    } else {
      return key
    }
  }).join('&')  
}

/**
 * Clone and change query dictionary and return query string
 * @param {{[key: string]: string}} query 
 * @param {string} key 
 * @param {string} value 
 * @returns {string}
 */
 function setQueryParameter(query, key, value) {
  const data = {...query}

  data[key] = value

  return getQueryParameters(data)
}

/**
 * Clone and set/unset key in query dictionary and return query string
 * @param {{[key: string]: string}} query 
 * @param {string} key 
 */
 function toggleQueryParameter(query, key) {
  const data = {...query}

  if(key in data) {
    delete data[key]

    return getQueryParameters(data)
  }

  return setQueryParameter(data, key, '1')
}

/**
 * Change language path, for example the path 'en/path' will be transformed to '{lang}/path'
 * @param {string} url 
 * @param {string} lang 
 */
 function changeLangPath(url, lang) {
  url = trimSlashes(url)

  const { localeRoute } = inject

  const index = url.search(localeRoute)

  if(index >= 0) {
    return url.replace(localeRoute, lang)
  }

  return `${lang}/${url}`
}

module.exports = {
  getQueryParameters,
  setQueryParameter,
  toggleQueryParameter,
  changeLangPath
}
