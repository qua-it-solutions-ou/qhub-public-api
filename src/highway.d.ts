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

export interface Children {
    [name: string]: Highway<Arguments, any, LineResult<any>>
}

export interface Highway<ARGS extends Arguments, D extends LineDefault, T, C extends Children = Children> extends Iterable<Line<ARGS, D, T>> {
    _: Children & C;

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
    Highway<Arguments, LineDefault, any, any> | LineDriver<Arguments, LineDefault, any> | AutoProxyStructMap;

export type AutoProxy<STRUCT extends AutoProxyStruct, BASE extends Highway<Arguments, LineDefault, any> | undefined = undefined> = (
    BASE extends undefined ? (
        (
            STRUCT extends Highway<infer ARGS, infer D, infer T, infer C> ? Highway<ARGS, D, T, C> : (
                STRUCT extends (...args: infer Args) => infer R ? Highway<Args, ExtractLineDefault<R>, ExtractResultType<R>> : (
                    STRUCT extends AutoProxyStructMap ? (
                        (
                            Highway<Arguments, LineDefault, any, {
                                [name in keyof STRUCT]: AutoProxy<STRUCT[name]>
                            } & Children>
                        )
                    ) : never
                )
            )
        )
    ) : (
        BASE extends Highway<infer bARGS, infer bD, infer bT, infer bC> ? (
            STRUCT extends Highway<infer ARGS, infer D, infer T, infer C> ? Highway<ARGS & bARGS, D & bD, T & bT, C & bC> : (
                STRUCT extends (...args: infer Args) => infer R ? Highway<Args & bARGS, ExtractLineDefault<R> & bD, ExtractResultType<R> & bT, bC> : (
                    STRUCT extends AutoProxyStructMap ? (
                        (
                            Highway<bARGS, bD, bT, {
                                [name in keyof STRUCT]: AutoProxy<STRUCT[name]>
                            } & bC>
                        )
                    ) : never
                )
            )
        ) : (
            never
        )
    )
)

export type Arguments = any[];
