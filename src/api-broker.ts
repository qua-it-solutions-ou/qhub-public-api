import {Observable} from "rxjs";

export type APIRequestHandler = (action: string, input: Observable<any>) => Observable<any>;

export interface APIBroker {
    request(action: string, input: Observable<any>): Observable<any>;
    register(action: string, handler: APIRequestHandler): void;
    unregister(action: string, handler: APIRequestHandler): void;
}
