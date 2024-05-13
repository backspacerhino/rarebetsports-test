export abstract class BaseFactory<T> {
  constructor() {}

  abstract create(data?: Partial<T>): Partial<T>

  /**
   * @param count The number of <T> to create. The minimum acceptable value is 1.
   * @param partials The partials will be applied in order. Any <T> not covered by a partial will use default values for every field.
   * @throws Error when the count is less than one.
   * @throws Error when the number of partials exceed the count.
   */
  createMultiple(count: number, data?: Partial<T>): Partial<T>[] {
    if (count < 1) {
      throw new Error('The count needs to be 1 or greater.')
    }
    const items: Partial<T>[] = []
    for (let i = 0; i < count; i++) {
      items.push(this.create(data))
    }
    return items
  }
}
