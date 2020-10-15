import {Highway} from './highway';
import {PluginManagerHighway} from './plugins';
import {ConnectionIdentifier, ConnectionManagerHighway} from './connections';
import {DomainsHighway} from './domains';
import {WindowIdentifier, WindowManagerHighway} from './window';
import {CertificationManagerHighway} from './certifications';
import {UpdateManagerHighway} from './updates';

export type UIPluginHighway = HubPluginHighway & {
    namespace(line: 'ui-plugin-manager'): PluginManagerHighway;
};
export type HubPluginHighway = Highway & {
    namespace(line: 'plugin-manager'): PluginManagerHighway;
    namespace(line: 'connection-manager'): ConnectionManagerHighway;
    namespace(line: 'connection'): ConnectionNamespaceHighway;
    namespace(line: 'domains'): DomainsHighway;
    namespace(line: 'window-manager'): WindowManagerHighway;
    namespace(line: 'certification-manager'): CertificationManagerHighway;
    namespace(line: 'update-manager'): UpdateManagerHighway;
};

export type NodeHighway = Highway & {
    namespace(line: 'plugin-manager'): PluginManagerHighway;
};
export type NodePluginHighway = NodeHighway;

export interface NodePluginHandles {
    highway: NodePluginHighway
}

export interface HubPluginHandles {
    highway: HubPluginHighway
}

export interface UIPluginHandles extends HubPluginHandles {
    highway: UIPluginHighway,
    windowIdentifier: WindowIdentifier
}

export interface NodePluginFunction {
    (pluginHandles: NodePluginHandles): Promise<void>;
}
export interface HubPluginFunction {
    (pluginHandles: HubPluginHandles): Promise<void>;
}
export interface UIPluginFunction {
    (pluginHandles: UIPluginHandles): Promise<void>;
}

export type ConnectionHighway = NodeHighway;
export type ConnectionNamespaceHighway = Highway & {
    namespace(connectionID: ConnectionIdentifier): ConnectionHighway;
};
