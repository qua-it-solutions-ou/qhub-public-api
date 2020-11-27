import {APIBroker} from "./api-broker";
import {ConnectionIdentifier} from "./connections";

export function getLocalPluginBroker(name: string): APIBroker;
export function getRemotePluginBroker(connection: ConnectionIdentifier, name: string): APIBroker;
