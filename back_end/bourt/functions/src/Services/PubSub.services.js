import { EventEmitter, on } from 'events';

class PubSub {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  publish(topic, payload) {
    console.log("Payload", payload)
    this.eventEmitter.emit(topic, payload);
  }

  async *subscribe(topic) {
    const asyncIterator = on(this.eventEmitter, topic);
    for await (const [value] of asyncIterator) {
      yield value;
    }
  }
}

const pubSub = new PubSub();


