import {Domains} from './domains';
import {AutoProxy} from "./highway";

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

export interface CertificationManagerHighway extends AutoProxy<{
    status(): Promise<CertificationStatus>
}> {}

