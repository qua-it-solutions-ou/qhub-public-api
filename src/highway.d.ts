import {Observable} from 'rxjs';
import {Stream} from 'stream';

export type LineResult<T> = Promise<T> | Observable<T> | (T extends Stream ? T : never);

export type LineDefault = 'promise' | 'observable' | 'stream';
export type ExtractLineDefault<R extends LineResult<any>> = (
    R extends Promise<any> ? (
        'promise'
    ) : (
        R extends Observable<any> ? (
            'observable'
        ) : (
            R extends Stream ? (
                'stream'
            ) : (
                never
            )
        )
    )
);
export type ExtractResultType<R extends LineResult<any>> = (
    R extends Promise<infer T> ? (
        T
    ) : (
        R extends Observable<infer T> ? (
            T
        ) : (
            R extends Stream ? (
                R
            ) : (
                never
            )
        )
    )
);
export type BuildLineResult<D extends LineDefault, T> = (
    D extends 'promise' ? (
        Promise<T>
    ) : (
        D extends 'observable' ? (
            Observable<T>
        ) : (
            D extends 'stream' ? (
                (T extends Stream ? T : never)
            ) : (
                never
            )
        )
    )
)

export type LineDriver<ARGS extends Arguments, D extends LineDefault, T> =
    (...args: ARGS) => BuildLineResult<D, T>;

export interface Line<ARGS extends Arguments, D extends LineDefault, T> {
    (...args: ARGS): BuildLineResult<D, T>,
    lineDefault: LineDefault,
    meta?: any,
    key: number
}

export interface LineRegistration<ARGS extends Arguments, D extends LineDefault, T, META> extends Line<ARGS, D, T> {
    unregister(): void;
    meta: META
}

export interface Highway<ARGS extends Arguments, D extends LineDefault, T> extends Iterable<Line<ARGS, D, T>> {
    _: {
        [name: string]: Highway<Arguments, LineDefault, any>
    };

    lines$: Observable<Line<ARGS, D, T>[]>;
    children$: Observable<{
        [name: string]: Highway<Arguments, any, LineResult<any>>
    }>;

    new <META>(lineDefault: D, driver: LineDriver<ARGS, D, T>, meta?: META): LineRegistration<ARGS, D, T, META>
    (...args: ARGS): BuildLineResult<D, T>
}

export interface AutoProxyStructMap {
    [name: string]: AutoProxyStruct
}

export type AutoProxyStruct =
    Highway<Arguments, LineDefault, any> | LineDriver<Arguments, LineDefault, any> | AutoProxyStructMap;

export interface CustomHighway<ARGS extends Arguments, D extends LineDefault, T, C extends {
    [name: string]: Highway<Arguments, LineDefault, any>
}> extends Highway<ARGS, D, T> {
    _: C;
}

export type AutoProxy<STRUCT extends AutoProxyStruct> = (
    STRUCT extends Highway<Arguments, LineDefault, any> ? STRUCT : (
        STRUCT extends LineDriver<infer Args, infer D, infer T> ? Highway<Args, D, T> : (
            STRUCT extends AutoProxyStructMap ? (
                (
                    CustomHighway<Arguments, LineDefault, any, {
                        [name in keyof STRUCT]: AutoProxy<STRUCT[name]>
                    }>
                )
            ) : never
        )
    )
)

export type Arguments = any[];
