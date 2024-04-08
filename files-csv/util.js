//Funções de redirecionamento de página
function redirecionar(){
    window.location.href = "tela1.html"
};

function redirecionar_neymar2(){
    window.location.href = "neymar2.html"
};

function redirecionar_rafaela2(){
    window.location.href = "rafaela2.html"
};

function redirecionar_bruninho2(){
    window.location.href = "bruninho2.html"
};

function redirecionar_adriana2(){
    window.location.href = "adriana2.html"
};

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
        default:
            alert('Por favor, escolha um atleta.');
    }
}