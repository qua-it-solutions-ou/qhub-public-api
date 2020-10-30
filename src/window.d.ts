import {AutoProxy} from './highway';
import {Observable} from 'rxjs';

export type WindowIdentifier = string;
export type WindowHash = string;

export interface WindowManagerHighway extends AutoProxy<{
    control(windowID: WindowIdentifier, command: 'minimize' | 'maximize' | 'unmaximize' | 'restore' | 'close'): Promise<void>;
    state(windowID: WindowIdentifier): Observable<'minimized' | 'maximized' | 'windowed'>;
    create(parentWindowID: WindowIdentifier, hash: WindowHash): Promise<WindowIdentifier>;
}> {}
