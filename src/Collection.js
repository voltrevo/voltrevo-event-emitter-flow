// @flow

type Wrapper<T> = { value: ?T };

export default class Collection<T> {
  elements: Wrapper<T>[] = [];

  add(value: T) {
    const element: Wrapper<T> = { value };
    this.elements.push(element);

    return {
      remove() {
        element.value = undefined;
      },
    };
  }

  toArray(): T[] {
    const newElements: Wrapper<T>[] = [];
    const values: T[] = [];

    for (const element of this.elements) {
      const value = element.value;

      if (value != null) {
        newElements.push(element);
        values.push(value);
      }
    }

    this.elements = newElements;

    return values;
  }
}
