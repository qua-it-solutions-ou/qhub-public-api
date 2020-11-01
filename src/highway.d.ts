import {Observable} from 'rxjs';

export type LineDriver<ARGS extends any[], T> =
    (...args: ARGS) => Observable<T> | Promise<T> | T;

export interface Line<ARGS extends any[], T> {
    observe(...args: ARGS): Observable<T>;
    request(...args: ARGS): Promise<T>;

    meta?: any,
    key: number
}

export interface LineRegistration<ARGS extends any[], T, META> extends Line<ARGS, T> {
    unregister(): void;
    meta: META
}

export type LineName<N extends string = string> = N;


export interface Highway<ARGS extends any[], T> {
    child<NAME extends string>(name: LineName<NAME>): Highway<any[], any>;

    observe(...args: ARGS): Observable<T>;
    request(...args: ARGS): Promise<T>;

    lines: Line<ARGS, T>[];
    lines$: Observable<Line<ARGS, T>[]>;
    children$: Observable<{
        [NAME in string]: Highway<any[], any>
    }>;
    children: {
        [NAME in string]: Highway<any[], any>
    };

    register<META>(driver: LineDriver<ARGS, T>, meta?: META): LineRegistration<ARGS, T, META>;
}

export type AutoProxyStructMap = {
    [NAME in string]: AutoProxyStruct
}

export type AutoProxyStruct =
    Highway<any[], any> | ((...args: any[]) => any) | AutoProxyStructMap;

export type AutoProxy<STRUCT extends AutoProxyStruct> = (
    STRUCT extends Highway<any[], any> ? STRUCT : (
        STRUCT extends (...args: infer Args) => infer T ? Highway<Args, T> : (
            STRUCT extends AutoProxyStructMap ? (
                (
                    Highway<any[], any> & {
                        [NAME in LineName<Extract<keyof STRUCT, string>>]: AutoProxy<STRUCT[NAME]>
                    }
                )
            ) : never
        )
    )
)
