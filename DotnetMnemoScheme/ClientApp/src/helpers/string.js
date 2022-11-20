/**
 * Capitalize input
 * @param {string} input 
 * @returns {string}
 */
 function capitalize(input) {
  if(!input) {
    return input
  }

  const chars = input.split('')

  return chars[0].toUpperCase() + chars.slice(1).join('').toLowerCase()
}

/**
 * Trnsform input to camel text, for example 'camel-text' will be transformed to 'CamelText'
 * @param {string} input 
 * @returns {string}
 */
 function toCamel(input) {
  const parts = input.split('-')

  return parts.map(item => capitalize(item)).join('')
}

module.exports = {
  capitalize,
  toCamel
}
