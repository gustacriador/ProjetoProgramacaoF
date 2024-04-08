//Funções de redirecionamento de página
function redirecionar(){
    window.location.href = "tela1.html"
};

//Redirecionamento para a segunda página
function redirecionarAtleta2(nomeAtleta) {
    window.location.href = nomeAtleta + ".html";
}

//Redirecionamento para a terceira pergunta
function redirecionarAtleta3(nomeAtleta) {
    window.location.href = nomeAtleta + ".html";
}

//Redirecionamento para a quarta pergunta
function redirecionarAtleta4(nomeAtleta) {
    window.location.href = nomeAtleta + ".html";
}

//Redirecionamento para a quinta pergunta
function redirecionarAtleta5(nomeAtleta) {
    window.location.href = nomeAtleta + ".html";
}

//função que faz com que o select entenda a opção escolhida pelo usuário
function atletaSelecionado() {
    const select = document.getElementById('iest');
    const atletaSelecionado = select.value;

    switch (atletaSelecionado) {
        case 'atl-neymar':
            window.location.href = 'files-csv\\neymar.html';
            break;
        case 'atl-rafaela':
            window.location.href = 'files-csv\\rafaela.html';
            break;
        case 'atl-bruninho':
            window.location.href = 'files-csv\\bruninho.html';
            break;
        case 'atl-adriana':
            window.location.href = 'files-csv\\adriana.html';
            break;
        case 'atl-geral':
            window.location.href = 'files-csv\\geral.html';
            break;
        default:
            alert('Por favor, escolha uma opção.');
    }
}