// Função para fazer o fetch do arquivo CSV e transformá-lo em uma matriz
async function fetchCSV_ConverteArray(url) {
    try {
        // Fazendo o fetch do arquivo CSV
        const response = await fetch(url);
        
        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao obter o arquivo CSV');
        }
        
        // Obtendo o texto do arquivo CSV
        const csvTexto = await response.text();
        
        // Dividindo o texto em linhas
        const linhas = csvTexto.trim().split('\n');
        
        // Convertendo as linhas em matriz
        const csvArray = linhas.map(row => {
            // Removendo as aspas e dividindo os valores
            return row.replace(/"/g, '').split(',');
        });
        
        // Retorna a matriz obtida a partir do arquivo CSV
        return csvArray;
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}

// Função para normalizar o nome removendo acentos, espaços extras e transformando em minúsculas
const normalizaNome = (name) => name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

// Função para filtrar um atleta pelo nome
function filtraAtleta_Nome(csvArray, name) {
    // Normaliza o nome do atleta que estamos procurando
    const normalizaNome_pesquisado = normalizaNome(name);
    
    // Filtra o array de dados para encontrar o atleta com um nome que corresponde ao nome normalizado
    return csvArray.filter(row => {
        const nomeAtleta = normalizaNome(row[1]);
        return nomeAtleta === normalizaNome_pesquisado;
    });
}

// Função para contar a quantidade de medalhas de um atleta
function contaMedalhas(atletaData) {
    // Filtra apenas as linhas em que o atleta ganhou uma medalha
    const linhaMedalhas = atletaData.filter(row => {
        return row[14] === 'Gold\r' || row[14] === 'Silver\r' || row[14] === 'Bronze\r';
    });

    // Retorna o número de medalhas
    return linhaMedalhas.length;
}

// Função para obter o caminho da página atual
const arquivoUrl = window.location.href;
const csvFileName = 'athlete_events.csv';
const csvUrl = arquivoUrl.substring(0, arquivoUrl.lastIndexOf('/')) + '/' + csvFileName;

// Função para lidar com a ação de clique do botão para um atleta específico
async function clicarBotao(nomeAtleta, resultDivId) {
    const csvArray = await fetchCSV_ConverteArray(csvUrl);
    console.log(csvArray);
    if (csvArray) {
        const filtrandoAtleta = filtraAtleta_Nome(csvArray, nomeAtleta);
        console.log(filtrandoAtleta);
        const medalsCount = contaMedalhas(filtrandoAtleta);
        console.log(medalsCount);
        const resultadoDiv = document.getElementById(resultDivId);
        resultadoDiv.innerText = `O atleta possui ${medalsCount} medalha(s).`;
    } else {
        console.log('Não foi possível obter a matriz do arquivo CSV.');
    }
}

// Resposta de cada botão
document.addEventListener("DOMContentLoaded", () => {
    const btnNeymar = document.getElementById('meuBotao');
    const btnRafaela = document.getElementById('botaoRafaela');
    const btnBruninho = document.getElementById('botaoBruninho');
    const btnAdriana = document.getElementById('botaoAdriana');

    if (btnNeymar) {
        btnNeymar.addEventListener('click', async () => {
            await clicarBotao('Neymar da Silva Santos Jnior', 'medalhas-neymar');
        });
    } else {
        console.error("Botão de Neymar não encontrado.");
    }

    if (btnRafaela) {
        btnRafaela.addEventListener('click', async () => {
            await clicarBotao('Rafaela Lopes Silva', 'medalhas-rafaela');
        });
    } else {
        console.error("Botão de Rafaela não encontrado.");
    }
    if (btnBruninho){
        btnBruninho.addEventListener('click', async () => {
            await clicarBotao('Bruno Bruninho Mossa de Rezende', 'medalhas-bruninho');
        });
    } else {
        console.error("Botão de Bruninho não encontrado")
    }
    if (btnAdriana) {
        btnAdriana.addEventListener('click', async () => {
            await clicarBotao('Adriana dos Santos Arajo', 'medalhas-adriana');
        });
    } else {
        console.error("Botão de Adriana não encontrado.");
    }
});