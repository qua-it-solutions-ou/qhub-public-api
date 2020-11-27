import {APIServer} from "./api-broker";
import {ConnectionIdentifier} from "./connections";

export function getLocalPluginBroker(name: string): APIServer;
export function getRemotePluginBroker(connection: ConnectionIdentifier, name: string): APIServer;
