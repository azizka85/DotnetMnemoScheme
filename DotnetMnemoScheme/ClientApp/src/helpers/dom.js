const { inject } = require('../globals')

/**
 * @param {Event} event 
 * @param {HTMLElement} elem 
 */
async function navigateHandler(event, elem) {
  event.preventDefault();

  const { routeNavigator } = inject

  const path = elem.getAttribute?.('href')

  if(path) {
    await routeNavigator.navigateTo(path)
  }
}

/**
 * @param {HTMLElement?} elem 
 */
async function mount(elem) {
  if(elem) {
    await sleep(10)

    elem.classList.remove('page-unmount')
  }
}

/**
 * @param {HTMLElement?} elem 
 */
async function unmount(elem) {
  if(elem) {
    elem.classList.add('page-unmount')

    await sleep(250)
  }
}

module.exports = {
  navigateHandler,
  mount,
  unmount
}
