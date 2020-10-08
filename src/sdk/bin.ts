#!/usr/bin/env node

import path from 'path';
import fs from 'fs';

import yargs from 'yargs';
import {generatePack} from './pack';

yargs
    .usage('Usage: qhub-sdk <command> [options]')
    .command(
        'pack', 'Pack the QHub plugin with its resources',
            yargs =>
                yargs
                    .string('root').default('root', '.')
                    .string('output'),
        async args => {
            const root = path.resolve(args.root);

            const packagePath = path.join(root, 'package.json');
            const packageJson = JSON.parse(fs.readFileSync(packagePath, {encoding: 'utf8'}));

            const name = packageJson.name as string;

            const output = args.output ?? path.resolve(root, name + '.plugin');

            const packed = await generatePack(root);

            console.log('Generated plugin pack successfully. Saving the file: ' + output);
            fs.writeFileSync(output, packed);
        }
    )
    .demandCommand(1, 1)
    .help()
    .argv;
