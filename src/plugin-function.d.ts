import {Highway} from './highway';
import {PluginManagerHighway} from './plugins';
import {ConnectionIdentifier, ConnectionManagerHighway} from './connections';

export interface PluginHandles {
    highway: Highway
}

export interface PluginFunction {
    (pluginHandles: PluginHandles): Promise<void>;
}

export type ConnectionHighway = Highway & {
    namespace(line: 'plugin-manager'): PluginManagerHighway;
};

export type ConnectionNamespaceHighway = Highway & {
    namespace(connectionID: ConnectionIdentifier): ConnectionHighway;
};

export type PluginHighway = Highway & {
    namespace(line: 'plugin-manager'): PluginManagerHighway;
    namespace(line: 'connection-manager'): ConnectionManagerHighway;
    namespace(line: 'connection'): ConnectionNamespaceHighway;
};
