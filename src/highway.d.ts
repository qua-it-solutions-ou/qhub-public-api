import {Observable} from 'rxjs';
import {Stream} from 'stream';

export type LineResult<T> = Promise<T> | Observable<T> | (
    T extends Highway<Arguments, any> ? T : (
        T extends Stream ? T : (
            never
        )
    )
);

export type LineDriver<ARGS extends Arguments, T> =
    (...args: ARGS) => LineResult<T>;

export interface Line<ARGS extends Arguments, T> {
    observe(...args: ARGS): Extract<LineResult<T>, Observable<any>>;
    request(...args: ARGS): Extract<LineResult<T>, Promise<any>>;
    stream(...args: ARGS): Extract<LineResult<T>, Stream>;
    highway(...args: ARGS): Extract<LineResult<T>, Highway<Arguments, any>>;

    meta?: any,
    key: number
}

export interface LineRegistration<ARGS extends Arguments, T, META> extends Line<ARGS, T> {
    unregister(): void;
    meta: META
}

export type LineName<N extends string = string> = N;


export interface Highway<ARGS extends Arguments, T> {
    child<NAME extends string>(name: LineName<NAME>): Highway<Arguments, any>;

    observe(...args: ARGS): Extract<LineResult<T>, Observable<any>>;
    request(...args: ARGS): Extract<LineResult<T>, Promise<any>>;
    stream(...args: ARGS): Extract<LineResult<T>, Stream>;
    highway(...args: ARGS): Extract<LineResult<T>, Highway<Arguments, any>>;

    lines: Line<ARGS, T>[];
    lines$: Observable<Line<ARGS, T>[]>;
    children$: Observable<{
        [NAME in string]: Highway<Arguments, any>
    }>;
    children: {
        [NAME in string]: Highway<Arguments, any>
    };

    register<META>(driver: LineDriver<ARGS, T>, meta?: META): LineRegistration<ARGS, T, META>;
}

export type AutoProxyStructMap = {
    [NAME in string]: AutoProxyStruct
}

export type AutoProxyStruct =
    Highway<Arguments, any> | ((...args: Arguments) => any) | AutoProxyStructMap;

export type AutoProxy<STRUCT extends AutoProxyStruct> = (
    STRUCT extends Highway<Arguments, any> ? STRUCT : (
        STRUCT extends (...args: infer Args) => infer T ? Highway<Args, T> : (
            STRUCT extends AutoProxyStructMap ? (
                (
                    Highway<Arguments, any> & {
                        [NAME in LineName<Extract<keyof STRUCT, string>>]: AutoProxy<STRUCT[NAME]>
                    }
                )
            ) : never
        )
    )
)

export type Arguments = any[];
