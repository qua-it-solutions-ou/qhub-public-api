import {AutoProxy} from './highway';
import {Observable} from "rxjs";

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

export interface UpdateManagerHighway extends AutoProxy<{
    version: {
        current(): Observable<HubVersion>,
        live(): Observable<HubVersion>
    },
    status(): Observable<UpdateStatus>,
    'trigger-update'(): Promise<void>
}> {}
