import {SubjectTreeProxy} from "plugment";
import {Observable} from "rxjs";

export type ConnectionIdentifier = string;

export interface ConnectionManagerHighway extends SubjectTreeProxy<never, never, {
    observeAvailableConnections(): Promise<Observable<ConnectionIdentifier[]>>;
    observeNewConnections(): Promise<Observable<ConnectionIdentifier>>;
    observeAvailableConnections(): Promise<Observable<ConnectionIdentifier>>; // all available connections + every next new-connection
    connection: {
        observeAvailability(connectionID: ConnectionIdentifier): Promise<Observable<undefined | boolean>>
    }
}> {}
