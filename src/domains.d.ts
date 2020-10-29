import {AutoProxy} from './highway';

export type Domain = string;
export type Domains = Domain[];

export interface DomainsHighway extends AutoProxy<{
    actives(): Domains;
    reload(): void;
    supply(): Domains;
}> {}
