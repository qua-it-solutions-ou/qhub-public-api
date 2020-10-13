import {Bus, Highway} from './highway';
import {Observable} from 'rxjs';

export type Domain = string;
export type Domains = Domain[];

export type DomainsHighway = Highway & {
    request(line: 'actives'): Promise<Domains>;
    observe(line: 'actives'): Observable<Domains>;
    request(line: 'reload'): Promise<void>;

    register(line: 'supply', driver: () => Observable<Domains>): Bus;
};
