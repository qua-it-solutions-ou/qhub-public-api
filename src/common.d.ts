import {HubPluginHighway, NodePluginHighway, UIPluginHighway} from "./plugin-function";

export const highway: UIPluginHighway | NodePluginHighway | HubPluginHighway;

export function setReady(ready: boolean): void;