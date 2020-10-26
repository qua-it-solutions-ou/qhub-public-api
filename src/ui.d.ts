import {UIPluginHighway} from "./plugin-function";
import {WindowIdentifier} from "./window";
import {ReactElement} from "react";

export type ResponsiveSize = 'smaller' | 'larger';

export function useHighway(): UIPluginHighway;
export function useResponsiveSize(): ResponsiveSize;

export function useTitle(title: string | undefined): void;
export function useTitle(): [
        string | undefined, (newTitle: string | undefined) => void
];

export function useWindowID(): WindowIdentifier;

export function Translation(
    props: {path: string | string[]} | {children: string | string[]}
): ReactElement<any, any>;

export const uiHighway: UIPluginHighway;