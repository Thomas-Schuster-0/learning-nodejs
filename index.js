import fs from 'fs';
import chalk from 'chalk';

function getError(e) {
    throw new Error(chalk.red('Ocorreu um erro: ', e.code));
}

// async/await
async function getFiles(p) {
    try {
        const content = await fs.promises.readFile(p, 'utf-8')
        console.log(content);
    } catch (error) {
        getError(error)
    }
}

// promises com then()
function getFiles(p) {
    fs.promises
        .readFile(p, 'utf-8')
        .then((content => console.log(chalk.green(content))))
        .catch(getError)
}

getFiles('./arquivos/texto.md')