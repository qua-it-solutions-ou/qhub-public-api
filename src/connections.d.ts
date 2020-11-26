import {Observable} from "rxjs";

export type ConnectionIdentifier = string;

export interface ConnectionManager {
    getAvailableConnections(): Promise<ConnectionIdentifier[]>;
    observeNewConnections(): Observable<ConnectionIdentifier>;
    observeAvailableConnections(): Observable<ConnectionIdentifier>; // all available connections + every next new-connection
    connection: {
        observeAvailability(connectionID: ConnectionIdentifier): Observable<undefined | boolean>
    }
}

export const connectionManager: ConnectionManager;
