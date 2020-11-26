import {MessageAddress} from "./message-broker";
import {ConnectionIdentifier} from "./connections";
import {WindowIdentifier} from "./window";

export function getConnectionAddress(connectionID: ConnectionIdentifier): MessageAddress;
export function getPluginProcessAddress(pluginName: string): MessageAddress;
export function getUIWindowAddress(windowID: WindowIdentifier): MessageAddress;
