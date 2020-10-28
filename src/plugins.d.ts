import {Highway} from './highway';
import {Observable} from 'rxjs';

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

export type PluginManagerHighway = Highway & {
    observe(line: 'active-instance', name: string, version?: string): Observable<PluginInstanceIdentifier | null>;
    request(line: 'instance/info', id: PluginInstanceIdentifier): Promise<PluginInfo>;
    observe(line: 'instance/active', id: PluginInstanceIdentifier): Observable<boolean>;
    observe(line: 'instance/ready', id: PluginInstanceIdentifier): Observable<boolean>;
    request(line: 'active-instances'): Promise<PluginInstanceIdentifier[]>;
    observe(line: 'active-instances'): Observable<PluginInstanceIdentifier[]>;
    request(line: 'instance/pack', id: PluginInstanceIdentifier): Promise<Buffer>;
    request(line: 'instance/pack-hash', id: PluginInstanceIdentifier): Promise<string>;
    request(line: 'instance/resource', id: PluginInstanceIdentifier, resourcePath: string): Promise<ResourceFile | undefined>;
    request(line: 'plug', pack: Buffer): Promise<PluginInstanceIdentifier>;
    request(line: 'unplug', nameOrIdentifier: string | PluginInstanceIdentifier): Promise<void>;
};
