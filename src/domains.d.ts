import {AutoProxy} from './highway';
import {Observable} from "rxjs";

export type Domain = string;
export type Domains = Domain[];

export interface DomainsHighway extends AutoProxy<{
    Actives(): Observable<Domains>;
    Reload(): Promise<void>;
    Supply(): Observable<Domains>;
}> {}
