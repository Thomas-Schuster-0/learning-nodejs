import fs from 'fs';
import chalk from 'chalk';

function getLinks(l) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const regexText = [...l.matchAll(regex)];
    return regexText.map(text => ({[text[1]]: text[2]}));
}

function getError(e) {
    throw new Error(chalk.red('Ocorreu um erro: ', e.code));
}

// async/await
async function getFiles(p) {
    try {
        const content = await fs.promises.readFile(p, 'utf-8')
        console.log(getLinks(content));
    } catch (error) {
        getError(error)
    }
}

getFiles('./arquivos/texto.md');
