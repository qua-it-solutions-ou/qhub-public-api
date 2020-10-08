import {Highway} from './highway';
import {Observable} from 'rxjs';

export type ConnectionIdentifier = string;

export type ConnectionManagerHighway = Highway & {
    request(line: 'available-connections'): Promise<ConnectionIdentifier[]>;
    observe(line: 'available-connection'): Observable<ConnectionIdentifier>;
    request(line: 'connection/availability'): Promise<boolean | undefined>;
    observe(line: 'connection/availability'): Observable<boolean>;
};
