import fs from 'fs';
import chalk from 'chalk';

function getLinks(link) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const regexText = [...link.matchAll(regex)];
    const result = regexText.map(text => ({[text[1]]: text[2]}));
    return result.length !== 0 ? result : 'não há links no arquivo';
}

function getError(error) {
    throw new Error(chalk.red('Ocorreu um erro: ', error.code));
}

// async/await
async function getFiles(path) {
    try {
        const content = await fs.promises.readFile(path, 'utf-8')
        return getLinks(content);
    } catch (error) {
        getError(error)
    }
}

export default getFiles;