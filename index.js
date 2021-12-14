// 使用 sticky 指令的节点应包在一个 static 定位的节点中，便于定位
const sticky = {
  inserted: function (el, binding, vnode) {
    const elTarget = $(el)
    const ignore = binding.value && binding.value.ignore
    const stickyCssClass = (binding.value && binding.value.stickyCssClass) || ''
    const top = (binding.value && binding.value.top) || 0
    // valid
    let validMinWidth = 0
    let validMaxWidth = Number.MAX_SAFE_INTEGER
    if (binding.value && binding.value.validWidth && Array.isArray(binding.value.validWidth)) {
      if (binding.value.validWidth[0]) validMinWidth = binding.value.validWidth[0]
      if (binding.value.validWidth[1]) validMaxWidth = binding.value.validWidth[1]
    }
    let validMinHeight = 0
    let validMaxHeight = Number.MAX_SAFE_INTEGER
    if (binding.value && binding.value.validHeight && Array.isArray(binding.value.validHeight)) {
      if (binding.value.validHeight[0]) validMinHeight = binding.value.validHeight[0]
      if (binding.value.validHeight[1]) validMaxHeight = binding.value.validHeight[1]
    }
    // ignoreHeight
    let ignoreHeight = 0
    if (ignore && Array.isArray(ignore)) {
      ignore.forEach(i => {
        if ($(i).outerHeight()) {
          ignoreHeight += $(i).outerHeight()
        }
      })
    }
    // relateTarget
    const relateTarget = binding.value && binding.value.relate && $(binding.value.relate)
    const parent = el.parentNode
    // 没有父节点不做操作
    if (!parent) return null
    el.scroll_func = throttle(e => {
      const clientWidth = $(window).width()
      const clientHeight = $(window).height()
      if (clientWidth < validMinWidth || clientWidth >= validMaxWidth) {
        el.style = ''
        elTarget.removeClass(stickyCssClass)
        return
      }
      if (clientHeight < validMinHeight || clientHeight >= validMaxHeight) {
        el.style = ''
        elTarget.removeClass(stickyCssClass)
        return
      }
      const scrollTop = $(window).scrollTop()
      const widthStatic = $(parent).width()
      const offsetStatic = $(parent).offset()
      const fixedTop = ignoreHeight + top
      const currentTop = offsetStatic.top - scrollTop
      if (currentTop > fixedTop) {
        el.style = ''
        elTarget.removeClass(stickyCssClass)
      } else if (relateTarget && scrollTop > (relateTarget.outerHeight() + relateTarget.offset().top) - (elTarget.outerHeight() + ignoreHeight + top)) {
        relateTarget.css({ position: 'relative' })
        elTarget.removeClass(stickyCssClass)
        elTarget.css({
          position: 'absolute',
          top: 'auto',
          left: 'auto',
          bottom: '0px'
        })
      } else {
        elTarget.addClass(stickyCssClass)
        elTarget.css({
          width: `${widthStatic}px`,
          position: 'fixed',
          top: `${ignoreHeight + top}px`,
          left: `${offsetStatic.left}px`,
          bottom: 'auto'
        })
      }
    }, 0)
    window.addEventListener('scroll', el.scroll_func)
  },
  unbind: function (el) {
    window.removeEventListener('scroll', el.scroll_func)
  }
}

export default sticky
