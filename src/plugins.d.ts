import {Bus, Highway} from './highway';
import {Observable} from 'rxjs';
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

export type StaticPluginManagerHighway = Highway & {
    observe(line: 'active-instance', name: string, version?: string): Observable<PluginInstanceIdentifier | null>;
    request(line: 'instance/info', id: PluginInstanceIdentifier): Promise<PluginInfo>;
    observe(line: 'instance/active', id: PluginInstanceIdentifier): Observable<boolean>;
    observe(line: 'instance/ready', id: PluginInstanceIdentifier): Observable<boolean>;
    request(line: 'active-instances'): Promise<PluginInstanceIdentifier[]>;
    observe(line: 'active-instances'): Observable<PluginInstanceIdentifier[]>;
    request(line: 'instance/pack', id: PluginInstanceIdentifier): Promise<Buffer>;
    request(line: 'instance/pack-hash', id: PluginInstanceIdentifier): Promise<string>;
    request(line: 'instance/resource', id: PluginInstanceIdentifier, resourcePath: string): Promise<ResourceFile | undefined>;
};

export type PluginManagerHighway = StaticPluginManagerHighway & {
    request(line: 'plug', pack: Buffer): Promise<PluginInstanceIdentifier>;
    request(line: 'unplug', nameOrIdentifier: string | PluginInstanceIdentifier): Promise<void>;
};

export type PluginRepositoryIdentifier = string;

export interface AvailablePluginInfo extends PluginInfo {
}

export type RepositoryPluginManagerHighway = PluginManagerHighway & {
    requestAll(line: 'repositories'): Promise<PluginRepositoryIdentifier[]>[];
    register(line: 'repositories', driver: () => Promise<PluginRepositoryIdentifier[]>): Bus;

    namespace(lineRepository: 'repository', repositoryIdentifier: PluginRepositoryIdentifier): PluginRepositoryHighway
};

export type PluginRepositoryHighway = Highway & {
    request(line: 'available-plugins'): Promise<AvailablePluginInfo[]>;
    register(line: 'available-plugins', driver: () => Promise<AvailablePluginInfo[]>): Bus;

    stream(line: 'plugin-pack', name: string, version: string): Readable;
    register(line: 'plugin-pack', driver: (name: string, version: string) => Readable): Bus;

    request(line: 'plugin-icon', name: string, version: string): Promise<Buffer>;
    register(line: 'plugin-icon', driver: (name: string, version: string) => Promise<Buffer>): Bus;
};
