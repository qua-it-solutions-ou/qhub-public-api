import {AutoProxy} from './highway';
import {Observable} from 'rxjs';

export type ConnectionIdentifier = string;

export interface ConnectionManagerHighway extends AutoProxy<{
    'available-connections'(): Observable<ConnectionIdentifier[]>;
    'new-connection'(): Observable<ConnectionIdentifier>;
    'available-connection'(): Observable<ConnectionIdentifier>; // all available connections + every next new-connection
    connection: {
        availability(connectionID: ConnectionIdentifier): Observable<undefined | boolean>
    }
}> {}
