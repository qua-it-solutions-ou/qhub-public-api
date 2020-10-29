import {AutoProxy} from './highway';
import {Readable} from "stream";

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

export type StaticPluginManagerHighway = AutoProxy<{
    'active-instance'(name: string, version?: string): PluginInstanceIdentifier | null;
    instance: {
        info(id: PluginInstanceIdentifier): PluginInfo;
        active(id: PluginInstanceIdentifier): boolean;
        ready(id: PluginInstanceIdentifier): boolean;
        pack(id: PluginInstanceIdentifier): Buffer;
        'pack-hash'(id: PluginInstanceIdentifier): string;
        resource(id: PluginInstanceIdentifier, resourcePath: string): ResourceFile | undefined;
    },
    'active-instances'(): PluginInstanceIdentifier[];
}>;

export type PluginManagerHighway = StaticPluginManagerHighway & AutoProxy<{
    plug(pack: Buffer): PluginInstanceIdentifier;
    unplug(nameOrIdentifier: string | PluginInstanceIdentifier): void;
}>;

export type PluginRepositoryIdentifier = string;

export interface AvailablePluginInfo extends PluginInfo {
}

export type RepositoryPluginManagerHighway = PluginManagerHighway & AutoProxy<{
    repositories(): PluginRepositoryIdentifier[],
    repository: {
       [repositoryIdentifier in PluginRepositoryIdentifier]: PluginRepositoryHighway
    }
}>;

export type PluginRepositoryHighway = AutoProxy<{
    'available-plugins'(): AvailablePluginInfo[];
    'plugin-pack'(name: string, version: string): Readable;
    'plugin-icon'(name: string, version: string): Buffer;
}>;
