import {Observable} from "rxjs";

export type Domain = string;
export type Domains = Domain[];

export interface DomainManager {
    observeActiveDomains(): Observable<Domains>;
}

export const domainManager: DomainManager;
