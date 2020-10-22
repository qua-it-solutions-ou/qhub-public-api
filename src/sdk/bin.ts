#!/usr/bin/env node

import path from 'path';
import fs from 'fs';

import yargs from 'yargs';
import {generatePack} from './pack';

yargs
    .usage('Usage: qhub-sdk <command> [options]')
    .scriptName('qhub-sdk')
    .command(
        'pack', 'Pack the QHub plugin with its resources',
            yargs =>
                yargs
                    .string('root').default('root', '.')
                    .string('output').array('output'),
        async args => {
            const root = path.resolve(args.root);

            const packagePath = path.join(root, 'package.json');
            const packageJson = JSON.parse(fs.readFileSync(packagePath, {encoding: 'utf8'}));

            const name = packageJson.name as string;

            let output = args.output ?? path.resolve(root, name + '.plugin');
            if (!Array.isArray(output)) {
                output = [output];
            }

            const packed = await generatePack(root);

            console.log('Generated plugin pack successfully.');
            for (const outputPath of output) {
                console.log('Saving the file: ' + outputPath);
                fs.writeFileSync(outputPath, packed);
            }
        }
    )
    .demandCommand(1, 1)
    .help()
    .argv;
