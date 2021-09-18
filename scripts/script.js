let seuVotoPara = document.querySelector('.divisao1-1 span');
let cargo = document.querySelector('.divisao1-2 span');
let descricao = document.querySelector('.divisao1-4');
let aviso = document.querySelector('.divisao2');
let lateral = document.querySelector('.divisao1-direita');
let numeros = document.querySelector('.divisao1-3');

let etapaAtual = 0;
let numero = ''; // numero que será digitado
let votoBranco = false;
let corrigir = true;

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHtml = ''; // variavel pra colocar nos numeros
    numero = '';
    votoBranco = false;
    corrigir = true;

    for (let i = 0; i < etapa.numeros; i++) {
        if(i === 0){ // if para que a 1 posicao pisque
            numeroHtml += '<div class="numero pisca"></div>';
        } else{
        numeroHtml += '<div class="numero"></div>'; 
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true;
        }else{
            return false;
        }
    });    
if(candidato.length > 0){
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        candidato = candidato[0]; // caso tenha mais candidatos com o mesmo numero
        descricao.innerHTML = `Nome: ${candidato.nome} <br>Partido: ${candidato.partido}<br>`;

        let fotosHtml = '';
        for (const i in candidato.fotos) {
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="divisao1-imagem small">
            <img src="${candidato.fotos[i].url}" alt="Imagem Prefeito">
            ${candidato.fotos[i].legenda}
    </div>`; } else {
            fotosHtml += `<div class="divisao1-imagem">
            <img src="${candidato.fotos[i].url}" alt="Imagem Prefeito">
            ${candidato.fotos[i].legenda}
    </div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca')
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero += n;

        elNumero.classList.remove('pisca')
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else{
            atualizaInterface()
        }
        
    }
}

function branco(){
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="voto-branco pisca">VOTO EM BRANCO</div>';
        numeros.innerHTML = '';
    } else{
        alert('Para votar em BRANCO \no campo de voto deve estar vazio.\n'+
        'Aperte CORRIGE para apagar o campo de voto.');
    }
}

function corrige(){
    if(corrigir){
    comecarEtapa();
    }
}

function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco){
        votoConfirmado = true;
        console.log('Confirmando como voto BRANCO');
    } else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        console.log('Confirmando como '+ numero);
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-grande pisca">VOTAÇÃO CONCLUÍDA</div>';
        }
    }
}

comecarEtapa();