import mitt from 'mitt'

/** https://github.com/joewalnes/reconnecting-websocket/blob/master/reconnecting-websocket.js */
const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)
// const noop = () => {}
// const typeOf = obj => Object.prototype.toString.call(obj).slice(8, -1)

export default class ReconnectingWebSocket {
  /** 重连前的延时(ms) */
  reconnectDelay = 1000
  /** 最大重连时长(ms),超过则再次重连 */
  maxReconnectInterval = 2000
  /** @type {number} 最大重连次数 */
  maxReconnectNumber = Infinity
  /** @type {boolean} 自动重连 */
  autoConnect = true

  emitter = mitt()
  /** @type {number} 自启动以来试图重新连接的次数，或最后一次成功连接的次数。 readonly. */
  reconnectAttempts = 0
  /** @type {number} 当前连接状态 readonly */
  readyState = WebSocket.CONNECTING
  /** @type {WebSocket|null} */
  ws = null
  /** @type {boolean} 强制关闭 */
  forcedClose = false
  timedOut = false

  static CONNECTING = WebSocket.CONNECTING
  static OPEN = WebSocket.OPEN
  static CLOSING = WebSocket.CLOSING
  static CLOSED = WebSocket.CLOSED

  constructor (url, options = {}) {
    ;['reconnectDelay', 'maxReconnectInterval', 'maxReconnectNumber', 'autoConnect'].forEach(
      key => {
        if (hasOwn(options, key)) this[key] = options[key]
      }
    )
    this.url = url

    this.on = this.emitter.on
    this.off = this.emitter.off
    this.on('connect', this.onconnect)
    this.on('disconnect', this.ondisconnect)
    this.on('connecting', this.onconnecting)
    this.on('message', this.onmessage)
    this.on('error', this.onerror)

    this.connect()
  }

  /** @param {boolean} isReconnect - 重新连接 */
  connect (isReconnect = false) {
    // 重连且重连次数大于最大重连次数则return
    if (isReconnect && this.reconnectAttempts > this.maxReconnectNumber) return
    this.ws = new WebSocket(this.url)

    if (isReconnect) {
      this.emitter.emit('reconnecting')
    } else {
      this.emitter.emit('connecting')
      this.reconnectAttempts = 0
    }
    // maxReconnectTime之后重连
    const timeout = setTimeout(this.reconnect, this.maxReconnectInterval)

    this.ws.onopen = event => {
      clearTimeout(timeout)
      this.readyState = WebSocket.OPEN
      this.reconnectAttempts = 0
      this.emitter.emit(isReconnect ? 'reconnect' : 'disconnect', event)
      isReconnect = false
    }

    this.ws.onclose = event => {
      clearTimeout(timeout)
      this.ws = null
      // 强制关闭即立刻关闭
      if (this.forcedClose) {
        this.readyState = WebSocket.CLOSED
        this.emitter.emit('disconnect', event)
      } else if (this.autoConnect) {
        // 重连
        this.readyState = WebSocket.CONNECTING
        this.emitter.emit('connecting')
        setTimeout(() => {
          this.reconnectAttempts++
          this.reconnect()
        }, this.reconnectDdelay)
      }
      this.forcedClose = false
    }
    this.ws.onmessage = event => {
      this.emitter.emit('message', event)
    }
    this.ws.onerror = event => {
      this.emitter.emit('error', event)
    }
  }

  /** 重连 */
  reconnect () {
    if (this.ws) {
      this.ws.close()
    } else {
      this.connect(true)
    }
  }

  send (data) {
    this.ws && this.ws.send(data)
  }

  /** 关闭 */
  disconnect (...args) {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent
    this.forcedClose = true
    this.ws && this.ws.close(...args)
  }

  onconnect () {}
  ondisconnect () {}
  onconnecting () {}
  onmessage () {}
  onerror () {}
}
