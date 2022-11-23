const { inject } = require('../globals')

/**
 * @param {Event} event 
 * @param {HTMLElement?} elem
 */
async function navigateHandler(event, elem) {
  event.preventDefault()

  const { routeNavigator } = inject

  elem = elem ?? event.target

  const path = elem?.getAttribute?.('href')

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

/**
 * @param {NodeListOf<HTMLElement>} linkButtons 
 * @param {((event: MouseEvent) => void)[]} linkButtonClickHandlers 
 */
function loadLinkButtonClickHandlers(linkButtons, linkButtonClickHandlers) {
  if(linkButtons) {
    for(const linkButton of linkButtons) {
      linkButtonClickHandlers.push((event) => navigateHandler(event, linkButton))
    }
  }
}

/**
 * @param {NodeListOf<HTMLElement>} linkButtons 
 * @param {((event: MouseEvent) => void)[]} linkButtonClickHandlers 
 */
function mountLinkButtonClickHandlers(linkButtons, linkButtonClickHandlers) {
  if(linkButtons) {
    for(let i = 0; i < linkButtons.length; i++) {
      linkButtons[i].addEventListener('click', linkButtonClickHandlers[i])
    }
  }
}

/**
 * @param {NodeListOf<HTMLElement>} linkButtons 
 * @param {((event: MouseEvent) => void)[]} linkButtonClickHandlers 
 */
function unmountLinkButtonClickHandlers(linkButtons, linkButtonClickHandlers) {
  if(linkButtons) {
    for(let i = 0; i < linkButtons.length; i++) {
      linkButtons[i].removeEventListener('click', linkButtonClickHandlers[i])
    }
  }
}

module.exports = {
  navigateHandler,
  mount,
  unmount,
  loadLinkButtonClickHandlers,
  mountLinkButtonClickHandlers,
  unmountLinkButtonClickHandlers
}
