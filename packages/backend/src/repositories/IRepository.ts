export interface IRepository<T> {
    findAll(): Promise<Array<T>>;
    findOneById(id: number): Promise<T | null>;
    deleteOne(id: number): Promise<T | null>;
    deleteMany(): Promise<void>;
    count(): Promise<number>;
    createOne(TCreateType: Partial<T>): Promise<T>;
}