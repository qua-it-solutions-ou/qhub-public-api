import {Observable} from "rxjs";

export type WindowIdentifier = string;
export type WindowHash = string;

export interface WindowManager {
    controlWindow(windowID: WindowIdentifier, command: 'minimize' | 'maximize' | 'unmaximize' | 'restore' | 'close'): Promise<void>;
    observeWindowState(windowID: WindowIdentifier): Observable<'minimized' | 'maximized' | 'windowed'>;
    createWindow(parentWindowID: WindowIdentifier, hash: WindowHash): Promise<WindowIdentifier>;
}

export const windowManager: WindowManager;
