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
    Version: {
        Current(): HubVersion,
        Live(): HubVersion
    },
    Status(): UpdateStatus,
    TriggerUpdate(): void
}> {}
