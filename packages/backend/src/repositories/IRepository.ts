export interface IRepository<T> {
    findAll(): Promise<Array<T>>;
    findOneById(id: string): Promise<T | null>;
    deleteOne(id: string): Promise<T | null>;
    deleteMany(): Promise<void>;
    count(): Promise<number>;
    createOne(TCreateType: Partial<T>): Promise<T>;
    updateOne(id: string, TUpdateType: Partial<T>): Promise<T>;
}