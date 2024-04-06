// Função para fazer o fetch do arquivo CSV e transformá-lo em uma matriz
async function fetchCSVAndConvertToArray(url) {
    try {
        // Fazendo o fetch do arquivo CSV
        const response = await fetch(url);
        
        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao obter o arquivo CSV');
        }
        
        // Obtendo o texto do arquivo CSV
        const csvText = await response.text();
        
        // Dividindo o texto em linhas
        const rows = csvText.trim().split('\n');
        
        // Convertendo as linhas em matriz
        const csvArray = rows.map(row => {
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

// Função para filtrar um atleta pelo nome
function filterAthleteByName(csvArray, name) {
    // Filtra o array de dados para encontrar o atleta com o nome especificado
    const filteredAthletes = csvArray.filter(row => row[1] === name);
    return filteredAthletes;
}

// Função para contar a quantidade de medalhas de um atleta
function countMedals(athleteData) {
    // Inicializa um contador para armazenar a contagem de medalhas
    const totalMedals = athleteData.map(row => row[14] !== 'NA').reduce((acc, cur) => acc + cur, 0);
  
    // Retorna a contagem de medalhas
    return totalMedals;
}

// Obtendo o caminho da página atual
const currentUrl = window.location.href;

// Construindo o caminho para o arquivo CSV com base no caminho atual
const csvFileName = 'athlete_events.csv'; // Nome do arquivo CSV
const csvUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/')) + '/' + csvFileName;

// Seleciona o botão "perguntar"
const btnPerguntar = document.getElementById('meuBotao');

// Adiciona um evento de clique ao botão
btnPerguntar.addEventListener('click', async () => {
    // Chamando a função fetchCSVAndConvertToArray e tratando a matriz resultante
    const csvArray = await fetchCSVAndConvertToArray(csvUrl);
    if (csvArray) {
        // Nome do atleta a ser filtrado
        const nameToFilter = 'Neymar da Silva Santos Jnior'; // Substitua pelo nome do atleta que deseja filtrar

        // Filtrando o atleta pelo nome
        const filteredAthlete = filterAthleteByName(csvArray, nameToFilter);
        
        // Contando as medalhas do atleta filtrado
        const medalsCount = countMedals(filteredAthlete);

        // Exibindo a quantidade de medalhas na tela
        const resultadoDiv = document.getElementById('medalhas');
        resultadoDiv.innerText = `O atleta possui ${medalsCount} medalha(s).`;
    } else {
        console.log('Não foi possível obter a matriz do arquivo CSV.');
    }
});