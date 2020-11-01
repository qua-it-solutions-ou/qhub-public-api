import {AutoProxy} from './highway';
import {Readable} from "stream";
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

export interface StaticPluginManagerHighway extends AutoProxy<{
    ActiveInstance(name: string, version?: string): PluginInstanceIdentifier | null;
    Instance: {
        Info(id: PluginInstanceIdentifier): PluginInfo;
        Active(id: PluginInstanceIdentifier): boolean;
        Ready(id: PluginInstanceIdentifier): boolean;
        Pack(id: PluginInstanceIdentifier): Buffer;
        PackHash(id: PluginInstanceIdentifier): string;
        Resource(id: PluginInstanceIdentifier, resourcePath: string): ResourceFile | undefined;
    },
    ActiveInstances(): PluginInstanceIdentifier[];
}> {}

export type PluginManagerHighway = AutoProxy<{
    Plug(pack: Buffer): PluginInstanceIdentifier;
    Unplug(nameOrIdentifier: string | PluginInstanceIdentifier): void;
}> & StaticPluginManagerHighway;

export type PluginRepositoryIdentifier = string;

export interface AvailablePluginInfo extends PluginInfo {
}

export interface RepositoryPluginManagerHighway extends AutoProxy<{
    Repositories(): PluginRepositoryIdentifier[]
}>, PluginManagerHighway {}

export interface PluginRepositoryHighway extends AutoProxy<{
    AvailablePlugins(): AvailablePluginInfo[];
    PluginPack(name: string, version: string): Readable;
    PluginIcon(name: string, version: string): Buffer;
}> {}
