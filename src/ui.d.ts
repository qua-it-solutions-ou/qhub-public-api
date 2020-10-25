import {UIPluginHighway} from "./plugin-function";
import {WindowIdentifier} from "./window";

export type ResponsiveSize = 'smaller' | 'larger';

export function useHighway(): UIPluginHighway;
export function useResponsiveSize(): ResponsiveSize;

export function useTitle(title: string | undefined): void;
export function useTitle(): [
        string | undefined, (newTitle: string | undefined) => void
];

export function useWindowID(): WindowIdentifier;