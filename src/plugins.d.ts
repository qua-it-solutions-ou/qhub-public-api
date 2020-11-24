import {Observable} from "rxjs";
import {SubjectTreeProxy} from "plugment";

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

export interface StaticPluginManagerAPI extends SubjectTreeProxy<never, never, {
    observeActiveInstance(name: string, version?: string): Promise<Observable<PluginInstanceIdentifier | null>>;
    instance: {
        getInfo(id: PluginInstanceIdentifier): Promise<PluginInfo>;
        observeActive(id: PluginInstanceIdentifier): Promise<Observable<boolean>>;
        observeReady(id: PluginInstanceIdentifier): Promise<Observable<boolean>>;
        getPack(id: PluginInstanceIdentifier): Promise<Buffer>;
        getPackHash(id: PluginInstanceIdentifier): Promise<string>;
        getResource(id: PluginInstanceIdentifier, resourcePath: string): Promise<ResourceFile | undefined>;
    },
    observeActiveInstances(): Promise<Observable<PluginInstanceIdentifier[]>>;
}> {}

export type PluginManagerAPI = SubjectTreeProxy<never, never, {
    plug(pack: Buffer): Promise<PluginInstanceIdentifier>;
    unplug(nameOrIdentifier: string | PluginInstanceIdentifier): Promise<void>;
}> & StaticPluginManagerAPI;
