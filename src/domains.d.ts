import {SubjectTreeProxy} from "plugment";

export type Domain = string;
export type Domains = Domain[];

export interface DomainsHighway extends SubjectTreeProxy<never, never, {
    getActives(): Domains;
    reload(): void;
    supply(): Domains;
}> {}
