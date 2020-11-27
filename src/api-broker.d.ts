import {Observable} from "rxjs";

export type APIRequestHandler = (action: string, input: Observable<any>) => Observable<any>;

export interface RequestOnlyAPIBroker {
    request(action: string, input: Observable<any>): Observable<any>;
}

export interface APIBroker extends RequestOnlyAPIBroker {
    register(action: string, handler: APIRequestHandler): void;
    unregister(action: string, handler: APIRequestHandler): void;
}
