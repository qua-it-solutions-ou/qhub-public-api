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
    observeActiveInstance(name: string, version?: string): Promise<PluginInstanceIdentifier | null>;

    instance: {
        getInfo(id: PluginInstanceIdentifier): Promise<PluginInfo>;
        observeActive(id: PluginInstanceIdentifier): Observable<boolean>;
        observeReady(id: PluginInstanceIdentifier): Observable<boolean>;
        getPack(id: PluginInstanceIdentifier): Promise<Buffer>;
        getPackHash(id: PluginInstanceIdentifier): Promise<string>;
        getResource(id: PluginInstanceIdentifier, resourcePath: string): Promise<ResourceFile | undefined>;
    },

    observeActiveInstances(): Observable<PluginInstanceIdentifier[]>;
}

export interface PluginManager extends StaticPluginManager {
    plug(pack: Buffer): Promise<PluginInstanceIdentifier>;
    unplug(nameOrIdentifier: string | PluginInstanceIdentifier): Promise<void>;
}

export const pluginManager: PluginManager;
