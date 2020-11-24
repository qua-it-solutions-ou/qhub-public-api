import {SubjectTreeProxy} from "plugment";
import {Observable} from "rxjs";

export type ConnectionIdentifier = string;

export interface ConnectionManagerHighway extends SubjectTreeProxy<never, never, {
    observeAvailableConnections(): ConnectionIdentifier[];
    observeNewConnections(): ConnectionIdentifier;
    observeAvailableConnections(): ConnectionIdentifier; // all available connections + every next new-connection
    connection: {
        observeAvailability(connectionID: ConnectionIdentifier): undefined | boolean
    }
}> {}
