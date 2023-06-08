import mitt from 'mitt'

const emitter = mitt()

export const bus = {
  emit: emitter.emit,
  on: emitter.on,
  off: emitter.off
}
