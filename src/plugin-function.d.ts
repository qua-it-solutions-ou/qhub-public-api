import {Highway} from './highway';
import {PluginManagerHighway, RepositoryPluginManagerHighway, StaticPluginManagerHighway} from './plugins';
import {ConnectionIdentifier, ConnectionManagerHighway} from './connections';
import {DomainsHighway} from './domains';
import {WindowManagerHighway} from './window';
import {CertificationManagerHighway} from './certifications';
import {UpdateManagerHighway} from './updates';

export type UIPluginHighway = HubPluginHighway & {
    namespace(line: 'ui-plugin-manager'): StaticPluginManagerHighway;
};
export type HubPluginHighway = Highway & {
    namespace(line: 'plugin-manager'): RepositoryPluginManagerHighway;
    namespace(line: 'connection-manager'): ConnectionManagerHighway;
    namespace(line: 'connection'): ConnectionNamespaceHighway;
    namespace(line: 'connection', connectionID: ConnectionIdentifier): ConnectionHighway;
    namespace(line: 'domains'): DomainsHighway;
    namespace(line: 'window-manager'): WindowManagerHighway;
    namespace(line: 'certification-manager'): CertificationManagerHighway;
    namespace(line: 'update-manager'): UpdateManagerHighway;
};

export type NodeHighway = Highway & {
    namespace(line: 'plugin-manager'): PluginManagerHighway;
};
export type NodePluginHighway = NodeHighway;

export type ConnectionHighway = NodeHighway;
export type ConnectionNamespaceHighway = Highway & {
    namespace(connectionID: ConnectionIdentifier): ConnectionHighway;
};
