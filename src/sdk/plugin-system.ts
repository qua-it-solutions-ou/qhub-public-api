import JSZip from 'jszip';
import {ResourceDirectory, ResourceFile} from "../plugins";

export interface PluginPackData {
    name: string,
    version: string,
    resources: ResourceDirectory
}

export interface FlatPluginPackData {
    name: string,
    version: string,
    flatResources: { [path: string]: Buffer | string }
}

interface PackageJSON {
    name: string,
    version: string
}

function scanResourceFiles(
    dir: ResourceDirectory, scanner: (path: string, file: ResourceFile) => void, parent: string = ''
): void {
    for (const [name, value] of Object.entries(dir)) {
        if (value instanceof Buffer) {
            scanner(parent + '/' + name, value);
        } else {
            scanResourceFiles(value, scanner, parent + '/' + name);
        }
    }
}

export async function buildPluginPack(data: PluginPackData | FlatPluginPackData): Promise<Buffer> {
    const jszip = new JSZip();

    const packageJSON: PackageJSON = {
        name: data.name,
        version: data.version
    };

    if ('resources' in data) {
        scanResourceFiles(
            data.resources,
            (path, file) => jszip.file(path, file)
        );
    } else {
        for (const [path, file] of Object.entries(data.flatResources)) {
            jszip.file(path, file);
        }
    }

    jszip.file(
        'package.json',
        JSON.stringify(packageJSON, null, ' ')
    );

    const pack = await jszip.generateAsync({
        type: 'nodebuffer'
    });
    return pack;
}
