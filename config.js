const fs = require('fs');
const csv = require('csv-parser');

// Função para ler o arquivo CSV
const lerCSV = (caminhoArquivo) => {
    fs.createReadStream(caminhoArquivo)
        .pipe(csv())
        .on('data', (linha) => {
            processarLinhas(linha);
        })
        .on('end', () => {
            console.log('Fim do arquivo CSV.');
        })
        .on('error', (error) => {
            console.error('Erro ao ler o arquivo CSV:', error);
        });
};

// Função para processar as linhas do CSV
const processarLinhas = (linha) => {
    console.log('Linha processada:', linha);
};

lerCSV('ProjetoProgramacaoF\\files-csv\\athlete_events.csv');
