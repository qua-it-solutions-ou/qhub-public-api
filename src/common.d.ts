import {HubPluginAPI, NodePluginAPI, UIPluginAPI} from "./plugin-function";

export const api: UIPluginAPI | NodePluginAPI | HubPluginAPI;

export function setReady(ready: boolean): void;