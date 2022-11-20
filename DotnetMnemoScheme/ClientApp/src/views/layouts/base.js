class BaseLayout {
  /**
   * Child content
   * @type {import('../view').View?}
   * @protected
   */
  content = null

  /**
   * Replace current content to this
   * @param {import('../view').View} content 
   */
  async replaceContent(content) {
    if(this.content?.replaceSelf) {
      await this.content.replaceSelf(content)
    } else {
      await this.content?.unmount?.()

      // TODO: Need to check and uncomment
      // await unmount(this.content?.elem || null)

      this.content?.elem?.replaceWith(content.elem)

      await content?.mount?.()

      // TODO: Need to check and uncomment
      // await mount(content.elem)
    }

    this.content = content
  }
}

module.exports = {
  BaseLayout
}
