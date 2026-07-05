const queue = [];

export function addToQueue(task) {
  queue.push(task);
}

export async function runQueue() {
  while (queue.length) {
    const task = queue.shift();
    await task();
  }
}
