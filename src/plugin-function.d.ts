import {AutoProxy} from './highway';
import {PluginManagerHighway, RepositoryPluginManagerHighway, StaticPluginManagerHighway} from './plugins';
import {ConnectionIdentifier, ConnectionManagerHighway} from './connections';
import {DomainsHighway} from './domains';
import {WindowManagerHighway} from './window';
import {CertificationManagerHighway} from './certifications';
import {UpdateManagerHighway} from './updates';

export type UIPluginHighway = AutoProxy<{
    'ui-plugin-manager': StaticPluginManagerHighway;
}> & HubPluginHighway;

export interface HubPluginHighway extends AutoProxy<{
    'plugin-manager': RepositoryPluginManagerHighway,
    'connection-manager': ConnectionManagerHighway,
    connection: ConnectionNamespaceHighway,
    domains: DomainsHighway,
    'window-manager': WindowManagerHighway,
    'certification-manager': CertificationManagerHighway,
    'update-manager': UpdateManagerHighway
}> {}

export interface NodeHighway extends AutoProxy<{
    'plugin-manager': PluginManagerHighway;
}> {}
export interface NodePluginHighway extends NodeHighway {
}

export interface ConnectionHighway extends NodeHighway {
}
export interface ConnectionNamespaceHighway extends AutoProxy<{
    [connectionID in ConnectionIdentifier]: ConnectionHighway;
}> {}
