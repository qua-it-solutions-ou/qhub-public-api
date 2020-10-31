import {AutoProxy} from './highway';
import {Observable} from 'rxjs';

export type WindowIdentifier = string;
export type WindowHash = string;

export interface WindowManagerHighway extends AutoProxy<{
    Control(windowID: WindowIdentifier, command: 'minimize' | 'maximize' | 'unmaximize' | 'restore' | 'close'): Promise<void>;
    State(windowID: WindowIdentifier): Observable<'minimized' | 'maximized' | 'windowed'>;
    Create(parentWindowID: WindowIdentifier, hash: WindowHash): Promise<WindowIdentifier>;
}> {}
