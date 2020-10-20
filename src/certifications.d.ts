import {Highway} from './highway';
import {Observable} from 'rxjs';
import {Domains} from './domains';

export type CertificationErrorCode = 'unknown' | 'challenge-failed' | 'no-subscription';
export type CertificationStatus = {
    code: 'certified',
    deadlines: {
        [domain: string]: Date
    },
    renewAt: Date
} | {
    code: 'requesting'
} | {
    code: 'error',
    errorCode: CertificationErrorCode,
    errorDomains: Domains,
    retryAt: Date
} | {
    code: 'no-domain'
};

export type CertificationManagerHighway = Highway & {
    observe(line: 'status'): Observable<CertificationStatus>;
};
