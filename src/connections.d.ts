import {Highway} from './highway';
import {Observable} from 'rxjs';

export type ConnectionIdentifier = string;

export type ConnectionManagerHighway = Highway & {
    request(line: 'available-connections'): Promise<ConnectionIdentifier[]>;
    observe(line: 'new-connection'): Observable<ConnectionIdentifier>;
    observe(line: 'available-connection'): Observable<ConnectionIdentifier>; // all available connections + every next new-connection
    request(line: 'connection/availability'): Promise<boolean | undefined>;
    observe(line: 'connection/availability'): Observable<boolean>;
};
