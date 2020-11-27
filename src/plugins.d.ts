import {Observable} from "rxjs";

export interface ResourceDirectory {
    [entry: string]: Resource
}
export type ResourceFile = Buffer;
export type Resource = ResourceDirectory | ResourceFile;

export type PluginInstanceIdentifier = number;
export interface PluginInfo {
    name: string,
    version: string
}

export interface StaticPluginManager {
    observeActiveInstance(name: string, version?: string): Observable<PluginInstanceIdentifier | null>;

    getInstanceInfo(id: PluginInstanceIdentifier): Promise<PluginInfo>;
    observeInstanceIfActive(id: PluginInstanceIdentifier): Observable<boolean>;
    observeInstanceIfReady(id: PluginInstanceIdentifier): Observable<boolean>;
    getInstancePack(id: PluginInstanceIdentifier): Promise<Buffer>;
    getInstancePackHash(id: PluginInstanceIdentifier): Promise<string>;
    getInstanceResource(id: PluginInstanceIdentifier, resourcePath: string): Promise<ResourceFile | undefined>;

    observeActiveInstances(): Observable<PluginInstanceIdentifier[]>;
}

export interface PluginManager extends StaticPluginManager {
    plug(pack: Buffer): Promise<PluginInstanceIdentifier>;
    unplug(nameOrIdentifier: string | PluginInstanceIdentifier): Promise<void>;
}

export const pluginManager: PluginManager;
