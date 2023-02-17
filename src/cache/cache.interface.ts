export interface ICacheRepository {
    get(key: string): Promise<string>;
    set(key: string, value: string, expire?: number): Promise<'OK'>;
    del(key: string): Promise<number>;
}

export const ICacheRepository = Symbol('ICacheRepository');
