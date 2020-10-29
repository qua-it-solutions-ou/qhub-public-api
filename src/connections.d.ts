import {AutoProxy} from './highway';
import {Observable} from 'rxjs';

export type ConnectionIdentifier = string;

export type ConnectionManagerHighway = AutoProxy<{
    'available-connections'(): ConnectionIdentifier[];
    'new-connection'(): ConnectionIdentifier;
    'available-connection'(): ConnectionIdentifier; // all available connections + every next new-connection
    connection: {
        availability(connectionID: ConnectionIdentifier): Observable<boolean> | Promise<boolean | undefined>
    }
}>;
