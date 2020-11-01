import {AutoProxy} from './highway';
import {Observable} from 'rxjs';

export type WindowIdentifier = string;
export type WindowHash = string;

export interface WindowManagerHighway extends AutoProxy<{
    Control(windowID: WindowIdentifier, command: 'minimize' | 'maximize' | 'unmaximize' | 'restore' | 'close'): void;
    State(windowID: WindowIdentifier): 'minimized' | 'maximized' | 'windowed';
    Create(parentWindowID: WindowIdentifier, hash: WindowHash): WindowIdentifier;
}> {}
