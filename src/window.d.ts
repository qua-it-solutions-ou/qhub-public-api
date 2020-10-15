import {Highway} from './highway';
import {Observable} from 'rxjs';

export type WindowIdentifier = string;

export type WindowManagerHighway = Highway & {
    request(line: 'control', windowID: WindowIdentifier, command: 'minimize' | 'maximize' | 'unmaximize' | 'restore' | 'close'): Promise<void>;
    observe(line: 'state', windowID: WindowIdentifier): Observable<'minimized' | 'maximized' | 'windowed'>;
};
