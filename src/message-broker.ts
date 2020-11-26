import {Observable} from "rxjs";

export type MessageAddress = string;
export type MessageChannel = string;

export interface Message {
    data: any;
    sender: MessageAddress,
    target: MessageAddress,
    channel: MessageChannel
}

export interface MessageFilter {
    sender?: MessageAddress | ((sender: MessageAddress) => boolean),
    target?: MessageAddress | ((target: MessageAddress) => boolean),
    channel?: MessageChannel | ((channel: MessageChannel) => boolean)
}

export interface MessageBroker {
    transmit(message: Message): void;
    receive(messageFilter: MessageFilter): Observable<Message>;
}
