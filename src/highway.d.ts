import {Observable} from 'rxjs';
import { Readable, Writable, Duplex } from 'stream';

export interface CancelablePromise<T> extends Promise<T> {
    cancel?(): void;
}

export type BusIdentifier = number;
export type LineIdentifier = string;

export type LineIdentifierPart = string;

export type Serializable = string | boolean | number | null | undefined | Date | Serializable[] | {[key: string]: Serializable} | ArrayBufferView;

export type Driver = {
    response(...args: Arguments): PromiseResult;
} | {
    emit(...args: Arguments): ObservableResult;
} | {
    stream(...args: Arguments): StreamResult;
} | {
    (...args: Arguments): Result
};

export type Arguments = Serializable[];
export type PromiseResult = CancelablePromise<any>;
export type ObservableResult = Observable<any>;
export type StreamResult = Readable | Writable | (Readable & Writable);
export type Result = PromiseResult | ObservableResult | StreamResult;

export interface Bus {
    readonly identifier: BusIdentifier;
    readonly line: LineIdentifier;
    unregister(): void;
}

export type Identifier = LineIdentifier | BusIdentifier;

export interface Highway {
    register(
        line: LineIdentifier,
        driver: Driver
    ): Bus;

    namespace(...parts: LineIdentifierPart[]): Highway;

    request(
        identifier: Identifier,
        ...args: Arguments
    ): PromiseResult;

    observe(
        identifier: Identifier,
        ...args: Arguments
    ): ObservableResult;

    observeAll(
        line: LineIdentifier,
        ...args: Arguments
    ): ObservableResult[];

    requestAll(
        line: LineIdentifier,
        ...args: Arguments
    ): PromiseResult[];

    stream(
        line: LineIdentifier,
        ...args: Arguments
    ): Duplex;
}
