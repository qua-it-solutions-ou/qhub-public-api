import {Highway} from './highway';
import {Observable} from 'rxjs';

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
};
