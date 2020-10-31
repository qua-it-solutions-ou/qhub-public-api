import {AutoProxy} from './highway';
import {PluginManagerHighway, RepositoryPluginManagerHighway, StaticPluginManagerHighway} from './plugins';
import {ConnectionIdentifier, ConnectionManagerHighway} from './connections';
import {DomainsHighway} from './domains';
import {WindowManagerHighway} from './window';
import {CertificationManagerHighway} from './certifications';
import {UpdateManagerHighway} from './updates';

export type UIPluginHighway = AutoProxy<{
    UIPluginManager: StaticPluginManagerHighway;
}> & HubPluginHighway;

export interface HubPluginHighway extends AutoProxy<{
    PluginManager: RepositoryPluginManagerHighway,
    ConnectionManager: ConnectionManagerHighway,
    Connection: ConnectionNamespaceHighway,
    Domains: DomainsHighway,
    WindowManager: WindowManagerHighway,
    CertificationManager: CertificationManagerHighway,
    UpdateManager: UpdateManagerHighway
}> {}

export interface NodeHighway extends AutoProxy<{
    PluginManage: PluginManagerHighway;
}> {}
export interface NodePluginHighway extends NodeHighway {
}

export interface ConnectionHighway extends NodeHighway {
}
export interface ConnectionNamespaceHighway extends AutoProxy<{
    [ConnectionID in ConnectionIdentifier]: ConnectionHighway;
}> {}
