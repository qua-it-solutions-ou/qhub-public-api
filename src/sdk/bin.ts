#!/usr/bin/env node

import path from 'path';
import fs from 'fs';

import yargs from 'yargs';
import {generatePack} from './pack';
import {putPlugin} from "./plugin-management";

yargs
    .usage('Usage: qhub-sdk <command> [options]')
    .scriptName('qhub-sdk')
    .command(
        'pack', 'Pack the QHub plugin with its resources',
            yargs =>
                yargs
                    .string('root').default('root', '.')
                    .string('output').array('output')
                    .boolean('put').default('put', false),
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

            if (args.put) {
                console.log('Putting plugin to the running instance @ 127.0.0.1:443')
                await putPlugin(packed);
                console.log('Plugin has been plugged in');
            }
        }
    )
    .demandCommand(1, 1)
    .help()
    .argv;
