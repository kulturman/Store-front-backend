export abstract class AbstractRepository <T> {
    abstract getAll(): Promise<Array<T>>;
    abstract create(t: T): Promise<boolean>;
    abstract findOne(id: number): Promise<T>;
}