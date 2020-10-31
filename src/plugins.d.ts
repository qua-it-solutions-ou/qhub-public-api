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
    ActiveInstance(name: string, version?: string): Observable<PluginInstanceIdentifier | null>;
    Instance: {
        Info(id: PluginInstanceIdentifier): Promise<PluginInfo>;
        Active(id: PluginInstanceIdentifier): Observable<boolean>;
        Ready(id: PluginInstanceIdentifier): Observable<boolean>;
        Pack(id: PluginInstanceIdentifier): Promise<Buffer>;
        PackHash(id: PluginInstanceIdentifier): Promise<string>;
        Resource(id: PluginInstanceIdentifier, resourcePath: string): Promise<ResourceFile | undefined>;
    },
    ActiveInstances(): Observable<PluginInstanceIdentifier[]>;
}> {}

export type PluginManagerHighway = AutoProxy<{
    Plug(pack: Buffer): Promise<PluginInstanceIdentifier>;
    Unplug(nameOrIdentifier: string | PluginInstanceIdentifier): Promise<void>;
}> & StaticPluginManagerHighway;

export type PluginRepositoryIdentifier = string;

export interface AvailablePluginInfo extends PluginInfo {
}

export type RepositoryPluginManagerHighway = AutoProxy<{
    Repositories(): Observable<PluginRepositoryIdentifier[]>,
    Repository: {
       [RepositoryIdentifier in PluginRepositoryIdentifier]: PluginRepositoryHighway
    }
}> & PluginManagerHighway;

export interface PluginRepositoryHighway extends AutoProxy<{
    AvailablePlugins(): Observable<AvailablePluginInfo[]>;
    PluginPack(name: string, version: string): Readable;
    PluginIcon(name: string, version: string): Promise<Buffer>;
}> {}
