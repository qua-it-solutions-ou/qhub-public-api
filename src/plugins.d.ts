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
    'active-instance'(name: string, version?: string): Observable<PluginInstanceIdentifier | null>;
    instance: {
        info(id: PluginInstanceIdentifier): Promise<PluginInfo>;
        active(id: PluginInstanceIdentifier): Observable<boolean>;
        ready(id: PluginInstanceIdentifier): Observable<boolean>;
        pack(id: PluginInstanceIdentifier): Promise<Buffer>;
        'pack-hash'(id: PluginInstanceIdentifier): Promise<string>;
        resource(id: PluginInstanceIdentifier, resourcePath: string): Promise<ResourceFile | undefined>;
    },
    'active-instances'(): Observable<PluginInstanceIdentifier[]>;
}> {}

export type PluginManagerHighway = AutoProxy<{
    plug(pack: Buffer): Promise<PluginInstanceIdentifier>;
    unplug(nameOrIdentifier: string | PluginInstanceIdentifier): Promise<void>;
}> & StaticPluginManagerHighway;

export type PluginRepositoryIdentifier = string;

export interface AvailablePluginInfo extends PluginInfo {
}

export type RepositoryPluginManagerHighway = AutoProxy<{
    repositories(): Observable<PluginRepositoryIdentifier[]>,
    repository: {
       [repositoryIdentifier in PluginRepositoryIdentifier]: PluginRepositoryHighway
    }
}> & PluginManagerHighway;

export interface PluginRepositoryHighway extends AutoProxy<{
    'available-plugins'(): Observable<AvailablePluginInfo[]>;
    'plugin-pack'(name: string, version: string): Readable;
    'plugin-icon'(name: string, version: string): Promise<Buffer>;
}> {}
