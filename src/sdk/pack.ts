import path from 'path';
import {promisify} from 'util';
import fs from 'fs';
import glob from 'glob';
import {buildPluginPack} from './plugin-system';

interface PackageJSON {
    name: string,
    version: string,
    qhub?: {
        files?: string[],
        node?: {
            main?: string
        },
        hub?: {
            main?: string
        },
        ui?: {
            main?: string
        }
    }
}

export async function generatePack(
    root: string
): Promise<Buffer> {
    const jsonPath = path.resolve(root, 'package.json');
    const jsonText = await promisify(fs.readFile)(jsonPath, {encoding: 'utf8'});
    const json = JSON.parse(jsonText) as PackageJSON;

    const qhub = json.qhub ?? {};

    if (qhub.files == null) {
        throw new Error('"qhub.files" field is not specified in package.json');
    }

    const flatResources: { [path: string]: Buffer | string } = {};
    for (const pattern of qhub.files) {
        const founds = await promisify(glob)(path.join(root, pattern));
        for (const fullPath of founds) {
            const relativePath = path.relative(root, fullPath);
            flatResources[relativePath] = await promisify(fs.readFile)(fullPath);
        }
    }

    const bootFiles = ['node', 'hub', 'ui'] as const;
    for (const bootFile of bootFiles) {
        const main = qhub[bootFile]?.main;
        if (main != null) {
            flatResources[bootFile + '.js'] = `module.exports = require(${JSON.stringify('./' + main)});`;
        }
    }

    return await buildPluginPack({
        name: json.name,
        version: json.version,
        flatResources
    });
}
