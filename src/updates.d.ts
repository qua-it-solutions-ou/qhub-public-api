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

export type UpdateManagerHighway = AutoProxy<{
    version: {
        current(): HubVersion,
        live(): HubVersion
    },
    status(): UpdateStatus,
    'trigger-update'(): void
}>;
