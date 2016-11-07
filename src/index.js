// @flow

import Collection from './Collection';
import MapWithDefault from './MapWithDefault';

type AsyncFn = (job: () => void) => void;

type Handler<T> = (value: T) => void;

export default class EventEmitter<T> {
  async: AsyncFn;
  events: MapWithDefault<Collection<Handler<T>>>;

  constructor(async: AsyncFn = (job) => { setTimeout(job); }) {
    this.events = new MapWithDefault(
      () => new Collection()
    );

    this.async = async;
  }

  on(evt: string, handler: Handler<T>) {
    return this.events.get(evt).add(handler);
  }

  once(evt: string, handler: Handler<T>) {
    const listener = this.events.get(evt).add((value) => {
      listener.remove();
      handler(value);
    });

    return listener;
  }

  emit = (evt: string, value: T) => {
    this.async(() => {
      this.events.get(evt).toArray().forEach((handler) => {
        handler(value);
      });
    });
  };
}
