import {AutoProxy} from './highway';

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
        current(): HubVersion,
        live(): HubVersion
    },
    status(): UpdateStatus,
    'trigger-update'(): void
}> {}
