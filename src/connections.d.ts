import {AutoProxy} from './highway';
import {Observable} from 'rxjs';

export type ConnectionIdentifier = string;

export interface ConnectionManagerHighway extends AutoProxy<{
    AvailableConnections(): Observable<ConnectionIdentifier[]>;
    NewConnection(): Observable<ConnectionIdentifier>;
    AvailableConnection(): Observable<ConnectionIdentifier>; // all available connections + every next new-connection
    Connection: {
        Availability(connectionID: ConnectionIdentifier): Observable<undefined | boolean>
    }
}> {}
