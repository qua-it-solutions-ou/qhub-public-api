import {Highway} from './highway';
import {PluginManagerHighway} from './plugins';
import {ConnectionIdentifier, ConnectionManagerHighway} from './connections';

export type HubPluginHighway = Highway & {
    namespace(line: 'plugin-manager'): PluginManagerHighway;
    namespace(line: 'connection-manager'): ConnectionManagerHighway;
    namespace(line: 'connection'): ConnectionNamespaceHighway;
};
export type NodePluginHighway = Highway & {
    namespace(line: 'plugin-manager'): PluginManagerHighway;
};

export interface NodePluginHandles {
    highway: NodePluginHighway
}

export interface HubPluginHandles {
    highway: HubPluginHighway
}

export interface NodePluginFunction {
    (pluginHandles: NodePluginHandles): Promise<void>;
}
export interface HubPluginFunction {
    (pluginHandles: HubPluginHandles): Promise<void>;
}

export type ConnectionHighway = Highway & {
    namespace(line: 'plugin-manager'): PluginManagerHighway;
};

export type ConnectionNamespaceHighway = Highway & {
    namespace(connectionID: ConnectionIdentifier): ConnectionHighway;
};
