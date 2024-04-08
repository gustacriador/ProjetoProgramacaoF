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

// Função para obter o caminho da página atual
const arquivoUrl = window.location.href;
const csvFileName = 'athlete_events.csv';
const csvUrl = arquivoUrl.substring(0, arquivoUrl.lastIndexOf('/')) + '/' + csvFileName;

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
        resultadoDiv.innerText = `O(a) atleta possui ${medalsCount} medalha(s).`;
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

// Função para retornar os anos que um atleta específico participou das Olimpíadas
function anosParticipacao(atletaData) {
    const anos = atletaData.map(row => row[9]);
    const anosUnicos = [...new Set(anos)];
    return anosUnicos;
}

async function clicarBotaoAnos(nomeAtleta, resultDivId) {
    const csvArray = await fetchCSV_ConverteArray(csvUrl);
    if (csvArray) {
        const filtrandoAtleta = filtraAtleta_Nome(csvArray, nomeAtleta);
        const anosParticipacaoAtleta = anosParticipacao(filtrandoAtleta).join(' e ');
        const resultadoDiv = document.getElementById(resultDivId);
        resultadoDiv.innerText = `O(a) atleta participou das Olimpíadas nos anos: ${anosParticipacaoAtleta}.`;
    } else {
        console.log('Não foi possível obter a matriz do arquivo CSV.');
    }
}

// Resposta de cada botão
document.addEventListener("DOMContentLoaded", () => {
    const btn_anoNeymar = document.getElementById('botao_anoNeymar');
    const btn_anoRafaela = document.getElementById('botao_anoRafaela');
    const btn_anoBruninho = document.getElementById('botao_anoBruninho');
    const btn_anoAdriana = document.getElementById('botao_anoAdriana');

    if (btn_anoNeymar) {
        btn_anoNeymar.addEventListener('click', async () => {
            await clicarBotaoAnos('Neymar da Silva Santos Jnior', 'ano-neymar');
        });
    }

    if (btn_anoRafaela) {
        btn_anoRafaela.addEventListener('click', async () => {
            await clicarBotaoAnos('Rafaela Lopes Silva', 'ano-rafaela');
        });
    }

    if (btn_anoBruninho){
        btn_anoBruninho.addEventListener('click', async () => {
            await clicarBotaoAnos('Bruno Bruninho Mossa de Rezende', 'ano-bruninho');
        });
    }

    if (btn_anoAdriana) {
        btn_anoAdriana.addEventListener('click', async () => {
            await clicarBotaoAnos('Adriana dos Santos Arajo', 'ano-adriana');
        });
    }
});

// Função para retornar a idade do atleta quando ele participou das Olimpíadas
function idadeParticipacao(atletaData) {
    // Mapeia os dados do atleta para um array de idades de participação
    const filtraIdades = atletaData.map(row => row[3]);
    const idades = [...new Set(filtraIdades)];
    return idades;
}

async function clicarBotaoIdade(nomeAtleta, resultDivId) {
    const csvArray = await fetchCSV_ConverteArray(csvUrl);
    if (csvArray) {
        const filtrandoAtleta = filtraAtleta_Nome(csvArray, nomeAtleta);
        const idadesParticipacaoAtleta = idadeParticipacao(filtrandoAtleta).join(', ');
        const resultadoDiv = document.getElementById(resultDivId);
        resultadoDiv.innerText = `O(a) atleta participou das Olimpíadas nas idades: ${idadesParticipacaoAtleta}.`;
    } else {
        console.log('Não foi possível obter a matriz do arquivo CSV.');
    }
}

// Resposta de cada botão
document.addEventListener("DOMContentLoaded", () => {
    const btn_idadeNeymar = document.getElementById('botao_idadeNeymar');
    const btn_idadeRafaela = document.getElementById('botao_idadeRafaela');
    const btn_idadeBruninho = document.getElementById('botao_idadeBruninho');
    const btn_idadeAdriana = document.getElementById('botao_idadeAdriana');

    if (btn_idadeNeymar) {
        btn_idadeNeymar.addEventListener('click', async () => {
            await clicarBotaoIdade('Neymar da Silva Santos Jnior', 'idade-neymar');
        });
    }

    if (btn_idadeRafaela) {
        btn_idadeRafaela.addEventListener('click', async () => {
            await clicarBotaoIdade('Rafaela Lopes Silva', 'idade-rafaela');
        });
    }

    if (btn_idadeBruninho){
        btn_idadeBruninho.addEventListener('click', async () => {
            await clicarBotaoIdade('Bruno Bruninho Mossa de Rezende', 'idade-bruninho');
        });
    }

    if (btn_idadeAdriana) {
        btn_idadeAdriana.addEventListener('click', async () => {
            await clicarBotaoIdade('Adriana dos Santos Arajo', 'idade-adriana');
        });
    }
});

// Mapeamento de medalhas
const medalhasMap = {
    'Gold\r': 'Ouro',
    'Silver\r': 'Prata',
    'Bronze\r': 'Bronze'
};

// Função para retornar as medalhas que um atleta ganhou por ano
function medalhasPorAno(atletaData) {
    return atletaData.reduce((acc, row) => {
        const ano = row[9];
        const medalha = medalhasMap[row[14]] || 'Nenhuma medalha';
        return {
            ...acc,
            [ano]: acc[ano] ? [...acc[ano], medalha] : [medalha]
        };
    }, {});
}

async function clicarBotaoMedalhas(nomeAtleta, resultDivId) {
    const csvArray = await fetchCSV_ConverteArray(csvUrl);
    if (csvArray) {
        const filtrandoAtleta = filtraAtleta_Nome(csvArray, nomeAtleta);
        const medalhasAtleta = medalhasPorAno(filtrandoAtleta);
        const resultadoDiv = document.getElementById(resultDivId);
        const textoResultado = Object.keys(medalhasAtleta).reduce((acc, ano) => {
            return acc + `No ano de ${ano}, o(a) atleta ganhou: ${medalhasAtleta[ano].join(', ')}. `;
        }, '');
        resultadoDiv.innerText = textoResultado;
    } else {
        console.log('Não foi possível obter a matriz do arquivo CSV.');
    }
}

// Resposta de cada botão
document.addEventListener("DOMContentLoaded", () => {
    const btn_tipoMNeymar = document.getElementById('botao_tipoMNeymar');
    const btn_tipoMRafaela = document.getElementById('botao_tipoMRafaela');
    const btn_tipoMBruninho = document.getElementById('botao_tipoMBruninho');
    const btn_tipoMAdriana = document.getElementById('botao_tipoMAdriana');

    if (btn_tipoMNeymar) {
        btn_tipoMNeymar.addEventListener('click', async () => {
            await clicarBotaoMedalhas('Neymar da Silva Santos Jnior', 'tipoM-neymar');
        });
    }
    if (btn_tipoMRafaela) {
        btn_tipoMRafaela.addEventListener('click', async () => {
            await clicarBotaoMedalhas('Rafaela Lopes Silva', 'tipoM-rafaela');
        });
    }
    if (btn_tipoMBruninho){
        btn_tipoMBruninho.addEventListener('click', async () => {
            await clicarBotaoMedalhas('Bruno Bruninho Mossa de Rezende', 'tipoM-bruninho');
        });
    }
    if (btn_tipoMAdriana) {
        btn_tipoMAdriana.addEventListener('click', async () => {
            await clicarBotaoMedalhas('Adriana dos Santos Arajo', 'tipoM-adriana');
        });
    }
});