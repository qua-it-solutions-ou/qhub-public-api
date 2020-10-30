import {Observable} from 'rxjs';
import {Readable, Stream, Writable} from 'stream';

export type LineIdentifierPart = string;
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
    (...args: ARGS): BuildLineResult<D, T>
}

export interface ComplexLine<ARGS extends Arguments, D extends LineDefault, T> extends Line<ARGS, D, T>, Iterable<Line<ARGS, D, T>> {
    [name: string]: ComplexLine<Arguments, any, LineResult<any>>;

    new (lineDefault: D, driver: LineDriver<ARGS, D, T>): Bus
}

export type AutoProxyStructMap = {
    [name: string]: ComplexLine<Arguments, LineDefault, any> | AutoProxyStruct
};

export type AutoProxyStruct =
    LineDriver<Arguments, LineDefault, any> | AutoProxyStructMap;

export type AutoProxy<STRUCT extends AutoProxyStruct> =(
    STRUCT extends ComplexLine<Arguments, LineDefault, any> ? STRUCT : (
        STRUCT extends (...args: infer Args) => infer R ? ComplexLine<Args, ExtractLineDefault<R>, ExtractResultType<R>> : (
            STRUCT extends AutoProxyStructMap ? (
                ComplexLine<Arguments, LineDefault, any> & {[name in keyof STRUCT]: AutoProxy<STRUCT[name]>}
            ) : never
        )
    )
)

export type Arguments = any[];

export interface Bus {
    unregister(): void;
}
