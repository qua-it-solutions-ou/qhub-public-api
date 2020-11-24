import {SubjectTreeProxy} from "plugment";

export type Domain = string;
export type Domains = Domain[];

export interface DomainsHighway extends SubjectTreeProxy<never, never, {
    getActives(): Promise<Domains>;
    reload(): Promise<void>;
    supply(): Promise<Domains>;
}> {}
