export interface IBaseRepository<T> {
  findBy(key: string, value: any): Promise<T | null>
  findByOrFail(key: string, value: any): Promise<T>
}
