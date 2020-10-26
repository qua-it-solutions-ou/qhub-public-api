import {request} from "https";

export function putPlugin(
    pack: Buffer
): Promise<void> {
    return new Promise<void>(
        (resolve, reject) => {
            const req = request({
                rejectUnauthorized: false,
                host: '127.0.0.1',
                port: 443,
                method: 'PUT',
                path: '/plugin',
                timeout: 5000
            });
            req.write(pack);
            req.end();

            req.once('timeout', () => reject(new Error('Timeout')));
            req.once('error', err => reject(err));
            req.once('close', () => reject(new Error('Close too early')));
            req.once('response', res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {
                    reject(new Error('Non 200 response'));
                }
            });
        }
    );
}