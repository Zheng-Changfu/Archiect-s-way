import { nextTick } from '../utils'
let queue = []
let obj = {}
let pending = false
export function queueWatcher (watcher) {
  const id = watcher.id
  if (!obj[id]) {
    queue.push(watcher)
    obj[id] = true
    if (!pending) {
      pending = true
      nextTick(flushSchedulerQueue)
    }
  }
}

function flushSchedulerQueue () {
  for (let i = 0; i < queue.length; i++) {
    queue[i].run()
  }
  queue = []
  obj = {}
  pending = false
}