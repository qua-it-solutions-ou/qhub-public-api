import {Highway} from './highway';
import {Observable} from 'rxjs';

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
    errorDomains: string[],
    retryAt: Date
} | {
    code: 'no-domain'
};

export type CertificationManagerHighway = Highway & {
    observe(line: 'status'): Observable<CertificationStatus>;
};
