export class EventEmitter {
  constructor () {
    this._events = Object.create(null);
  }

  /**
   * 订阅
   * @param {string | Array<string>} event
   * @param {Function} fn
   */
  on (event, fn) {
    if (Array.isArray(event)) {
      event.forEach(e => this.on(e, fn));
    } else {
      (this._events[event] || (this._events[event] = [])).push(fn);
    }
    return this;
  }

  /**
   * 取消订阅
   * @param {string | Array<string>} event
   * @param {Function} fn
   */
  off (event, fn) {
    if (Array.isArray(event)) {
      event.forEach(e => this.off(e, fn));
      return this;
    }
    const cbs = this._events[event]
    if (!cbs) return this;
    if (!fn) {
      this._events[event] = null;
      return this;
    }
    cbs.some((cb, i) => {
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        return true;
      }
    })
    if (cbs.length <= 0) delete this._events[event];
    return this
  }

  /**
   * 订阅一次
   * @param {string} event
   * @param {Function} fn
   */
  once (event, fn) {
    function on () {
      this.off(event, on)
      fn.apply(this, arguments)
    }
    on.fn = fn
    this.on(event, on)
    return this
  }

  /**
   * 发布
   * @param {string} event
   */
  emit (event, ...args) {
    const cbs = this._events[event];
    cbs && cbs.forEach(cb => {
      cb(...args);
    });
    return this;
  }
}
