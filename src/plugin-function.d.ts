import {PluginManagerAPI, StaticPluginManagerAPI} from './plugins';
import {ConnectionIdentifier, ConnectionManagerHighway} from './connections';
import {DomainsHighway} from './domains';
import {WindowManagerAPI} from './window';
import {CertificationManagerHighway} from './certifications';
import {UpdateManagerAPI} from './updates';
import {SubjectTreeProxy} from "plugment";

export interface UIPluginAPI extends SubjectTreeProxy<never, never, {
    UIPluginManager: StaticPluginManagerAPI;
}>, HubPluginAPI {
}

export interface HubPluginAPI extends SubjectTreeProxy<never, never, {
    PluginManager: PluginManagerAPI,
    ConnectionManager: ConnectionManagerHighway,
    Connection: (connectionIdentifier: ConnectionIdentifier) => ConnectionAPI,
    Domains: DomainsHighway,
    WindowManager: WindowManagerAPI,
    CertificationManager: CertificationManagerHighway,
    UpdateManager: UpdateManagerAPI
}> {}

export interface NodeAPI extends SubjectTreeProxy<never, never, {
    PluginManager: PluginManagerAPI;
}> {}
export interface NodePluginAPI extends NodeAPI {
}

export interface ConnectionAPI extends NodeAPI {
}
