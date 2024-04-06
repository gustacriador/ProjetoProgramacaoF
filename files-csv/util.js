//função que ativa o botão do index para a tela 1
function redirecionar(){
    window.location.href = "tela1.html"
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
            window.location.href = 'files-csv\\driana.html';
            break;
        default:
            alert('Por favor, escolha um atleta.');
    }
}