import chalk from 'chalk';
import fs from 'fs';
import getFiles from './index.js';

const path = process.argv;

function printList(result) {
    console.log(chalk.yellow('lista de links'), result);
}

async function textProcess(args) {
    const path = args[2];

    if (fs.lstatSync(path).isFile()) {
        const result = await getFiles(path);
        printList(result);
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        files.forEach(async (fileName) => {
            console.log(`${path}/${fileName}`);
            const list = await getFiles(`${path}/${fileName}`);
            printList(list);
        })
    }

}

textProcess(path);