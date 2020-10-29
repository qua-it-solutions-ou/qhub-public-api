import {Observable} from 'rxjs';
import {Duplex, Readable, Writable} from 'stream';
import * as HighwaySymbols from './highway-symbols.typings';
export * from './highway-symbols.typings';

export interface CancelablePromise<T> extends Promise<T> {
    cancel?(): void;
}

export type BusIdentifier = number;
export type LineIdentifier = string;

export type Identifier = LineIdentifier | BusIdentifier;

export type LineIdentifierPart = string;

export type Driver<Args extends Arguments, T extends any = any> = {
    response(...args: Args): PromiseResult<T>;
} | {
    emit(...args: Args): ObservableResult<T>;
} | {
    stream(...args: Args): StreamResult;
} | (
    (...args: Args) => Result<T>
);

export type LineProxyFunction<ARGS extends Arguments, T extends any> =
    (...args: ARGS) => T;

export type GenericTypeOfResult<T> = (
    T extends Promise<infer X> ? X : (
        T extends Observable<infer X> ? X : (
            T
        )
    )
);

export type PromiseResultFrom<T> = PromiseResult<Exclude<GenericTypeOfResult<T>, StreamResult>>;
export type ObservableResultFrom<T> = ObservableResult<Exclude<GenericTypeOfResult<T>, StreamResult>>;
export type StreamResultFrom<T> = T extends StreamResult ? T : never;

export type LineProxyDriver<FUNC extends LineProxyFunction<Arguments, any>> = {
    response(...args: Parameters<FUNC>): PromiseResultFrom<ReturnType<FUNC>>;
} | {
    emit(...args: Parameters<FUNC>): ObservableResultFrom<ReturnType<FUNC>>;
} | {
    stream(...args: Parameters<FUNC>): StreamResultFrom<ReturnType<FUNC>>;
} | (
    (...args: Parameters<FUNC>) => StreamResultFrom<ReturnType<FUNC>> | ObservableResultFrom<ReturnType<FUNC>> | PromiseResultFrom<ReturnType<FUNC>>
);

export interface LineProxy<FUNC extends LineProxyFunction<Arguments, any> = LineProxyFunction<Arguments, any>> {
    [namespacePart: string]: LineProxy,

    [HighwaySymbols.Request](...args: Parameters<FUNC>): PromiseResultFrom<ReturnType<FUNC>>;
    [HighwaySymbols.RequestAll](...args: Parameters<FUNC>): PromiseResultFrom<ReturnType<FUNC>>[];
    [HighwaySymbols.Observe](...args: Parameters<FUNC>): ObservableResultFrom<ReturnType<FUNC>>;
    [HighwaySymbols.ObserveAll](...args: Parameters<FUNC>): ObservableResultFrom<ReturnType<FUNC>>[];
    [HighwaySymbols.Stream](...args: Parameters<FUNC>): StreamResultFrom<ReturnType<FUNC>>;
    [HighwaySymbols.Register](driver: LineProxyDriver<FUNC>): Bus;
}

export type AutoProxyStructMap = {
    [namespacePart: string]: LineProxy | AutoProxyStruct
};
export type AutoProxyStruct =
    LineProxyFunction<any, any> | AutoProxyStructMap;

export type AutoProxy<STRUCT extends AutoProxyStruct> =(
    STRUCT extends LineProxyFunction<any, any> ? LineProxy<STRUCT> : (
        STRUCT extends LineProxy ? STRUCT : (
            STRUCT extends AutoProxyStructMap ? (
                LineProxy & {[namespacePart in keyof STRUCT]: AutoProxy<STRUCT[namespacePart]>}
            ) : never
        )
    )
)

export type Arguments = any[];
export type PromiseResult<T> = CancelablePromise<T>;
export type ObservableResult<T> = Observable<T>;
export type StreamResult = Readable | Writable | (Readable & Writable);
export type Result<T> = PromiseResult<T> | ObservableResult<T> | StreamResult;

export interface Bus {
    readonly identifier: BusIdentifier;
    readonly line: LineIdentifier;
    unregister(): void;
}

export interface Highway {
    register(
        line: LineIdentifier,
        driver: Driver<Arguments, any>
    ): Bus;

    request(
        line: Identifier,
        ...args: Arguments
    ): PromiseResult<any>;

    requestAll(
        line: LineIdentifier,
        ...args: Arguments
    ): PromiseResult<any>[];

    observe(
        line: Identifier,
        ...args: Arguments
    ): ObservableResult<any>;

    observeAll(
        line: LineIdentifier,
        ...args: Arguments
    ): ObservableResult<any>[];

    stream(
        line: Identifier,
        ...args: Arguments
    ): Duplex;

    namespace(
        ...parts: LineIdentifierPart[]
    ): Highway;

    proxy(): LineProxy;
}
