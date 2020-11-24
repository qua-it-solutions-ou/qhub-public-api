import {UIPluginAPI} from "./plugin-function";
import {WindowIdentifier} from "./window";

export type ResponsiveSize = 'smaller' | 'larger';

export function useAPI(): UIPluginAPI;
export function useResponsiveSize(): ResponsiveSize;

export function useTitle(title: string | undefined): void;
export function useTitle(): [
        string | undefined, (newTitle: string | undefined) => void
];

export function useWindowID(): WindowIdentifier;

export const uiAPI: UIPluginAPI;

export const windowIdentifier: WindowIdentifier;