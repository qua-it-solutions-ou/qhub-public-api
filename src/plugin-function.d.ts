import {AutoProxy} from './highway';
import {PluginManagerHighway, RepositoryPluginManagerHighway, StaticPluginManagerHighway} from './plugins';
import {ConnectionIdentifier, ConnectionManagerHighway} from './connections';
import {DomainsHighway} from './domains';
import {WindowManagerHighway} from './window';
import {CertificationManagerHighway} from './certifications';
import {UpdateManagerHighway} from './updates';

export type UIPluginHighway = HubPluginHighway & AutoProxy<{
    'ui-plugin-manager': StaticPluginManagerHighway;
}>;

export type HubPluginHighway = AutoProxy<{
    'plugin-manager': RepositoryPluginManagerHighway,
    'connection-manager': ConnectionManagerHighway,
    connection: ConnectionNamespaceHighway,
    domains: DomainsHighway,
    'window-manager': WindowManagerHighway,
    'certification-manager': CertificationManagerHighway,
    'update-manager': UpdateManagerHighway
}>;

export type NodeHighway = AutoProxy<{
    'plugin-manager': PluginManagerHighway;
}>;
export type NodePluginHighway = NodeHighway;

export type ConnectionHighway = NodeHighway;
export type ConnectionNamespaceHighway = AutoProxy<{
    [connectionID in ConnectionIdentifier]: ConnectionHighway;
}>;
