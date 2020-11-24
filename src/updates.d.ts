import {SubjectTreeProxy} from "plugment";
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

export interface UpdateManagerAPI extends SubjectTreeProxy<never, never, {
    getCurrentVersion(): HubVersion,
    observeLiveVersion(): HubVersion,
    observeStatus(): UpdateStatus,
    triggerUpdate(): void
}> {}
