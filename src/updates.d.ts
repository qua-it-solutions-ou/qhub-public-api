import {Highway} from './highway';
import {Observable} from 'rxjs';

export type HubVersion = string;
export type UpdateStatus = {
    phase: 'fresh'
} | {
    phase: 'pending-download'
} | {
    phase: 'downloading',
    progress: number
} | {
    phase: 'pending-restart',
    version: string
} | {
    phase: 'error'
};

export type UpdateManagerHighway = Highway & {
    request(line: 'version/current'): Promise<HubVersion>;
    observe(line: 'version/live'): Observable<HubVersion>;
    observe(line: 'status'): Observable<UpdateStatus>;
    request(line: 'trigger-update'): Promise<void>;
};
