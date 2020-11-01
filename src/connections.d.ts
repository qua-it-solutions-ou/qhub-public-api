import {AutoProxy} from './highway';
import {Observable} from 'rxjs';

export type ConnectionIdentifier = string;

export interface ConnectionManagerHighway extends AutoProxy<{
    AvailableConnections(): ConnectionIdentifier[];
    NewConnection(): ConnectionIdentifier;
    AvailableConnection(): ConnectionIdentifier; // all available connections + every next new-connection
    Connection: {
        Availability(connectionID: ConnectionIdentifier): undefined | boolean
    }
}> {}
