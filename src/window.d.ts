export type WindowIdentifier = string;
export type WindowHash = string;

export interface WindowManager {
    controlWindow(windowID: WindowIdentifier, command: 'minimize' | 'maximize' | 'unmaximize' | 'restore' | 'close'): Promise<void>;
    getWindowState(windowID: WindowIdentifier): Promise<'minimized' | 'maximized' | 'windowed'>;
    createWindow(parentWindowID: WindowIdentifier, hash: WindowHash): Promise<WindowIdentifier>;
}

export const windowManager: WindowManager;
