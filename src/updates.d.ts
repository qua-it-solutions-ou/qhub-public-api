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

export interface UpdateManager {
    getCurrentVersion(): Promise<HubVersion>;
    observeLiveVersion(): Observable<HubVersion>;
    observeStatus(): Observable<UpdateStatus>;
    triggerUpdate(): Promise<void>;
}

export const updateManager: UpdateManager;
