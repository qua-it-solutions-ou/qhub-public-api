import {SubjectTreeProxy} from "plugment";

export type WindowIdentifier = string;
export type WindowHash = string;

export interface WindowManagerAPI extends SubjectTreeProxy<never, never, {
    control(windowID: WindowIdentifier, command: 'minimize' | 'maximize' | 'unmaximize' | 'restore' | 'close'): void;
    getState(windowID: WindowIdentifier): 'minimized' | 'maximized' | 'windowed';
    create(parentWindowID: WindowIdentifier, hash: WindowHash): WindowIdentifier;
}> {}
