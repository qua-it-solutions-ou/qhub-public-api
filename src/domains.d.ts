import {AutoProxy} from './highway';

export type Domain = string;
export type Domains = Domain[];

export type DomainsHighway = AutoProxy<{
    actives(): Domains;
    reload(): void;
    supply(): Domains;
}>;
