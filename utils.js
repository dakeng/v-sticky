// 节流
function throttle (fn, ms = 100) {
  let throttleTimer = null
  return function (...args) {
    if (!throttleTimer) {
      const ret = fn.apply(this, args)
      throttleTimer = setTimeout(() => {
        throttleTimer = null
      }, ms)
      return ret
    }
  }
}

export { throttle }
