import {Observable} from "rxjs";

export interface APIClient {
    request(action: string, input: Observable<any>): Observable<any>;
}

export type APIListener = (action: string, input: Observable<any>) => Observable<any>;

export interface APIListenerEntry {
    unregister(): void;
}

export interface APIServer {
    register(action: string, handler: APIListener): APIListenerEntry;
}
