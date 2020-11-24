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
    observeActiveInstance(name: string, version?: string): PluginInstanceIdentifier | null;
    instance: {
        getInfo(id: PluginInstanceIdentifier): PluginInfo;
        observeActive(id: PluginInstanceIdentifier): boolean;
        observeReady(id: PluginInstanceIdentifier): boolean;
        getPack(id: PluginInstanceIdentifier): Buffer;
        getPackHash(id: PluginInstanceIdentifier): string;
        getResource(id: PluginInstanceIdentifier, resourcePath: string): ResourceFile | undefined;
    },
    observeActiveInstances(): PluginInstanceIdentifier[];
}> {}

export type PluginManagerAPI = SubjectTreeProxy<never, never, {
    plug(pack: Buffer): PluginInstanceIdentifier;
    unplug(nameOrIdentifier: string | PluginInstanceIdentifier): void;
}> & StaticPluginManagerAPI;
