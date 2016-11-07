// @flow

export default class MapWithDefault<T> {
  underlyingMap: { [key: string]: T };
  defaultGenerator: () => T;

  constructor(defaultGenerator: () => T) {
    this.defaultGenerator = defaultGenerator;
  }

  get(key: string): T {
    let value = this.underlyingMap[key];

    if (value === undefined) {
      value = this.defaultGenerator();
      this.set(key, value);
    }

    return value;
  }

  set(key: string, value: T) {
    this.underlyingMap[key] = value;
  }
}
