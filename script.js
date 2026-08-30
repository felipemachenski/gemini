// MODAL DE AJUDA
const botaoAjudaDestaque = document.querySelector('.botao-ajuda-destaque');
const botaoAjudaMenu = document.querySelector('.botao-ajuda-menu');
const botaoFecharModal = document.querySelector('.botao-fechar-modal');
const modalOverlay = document.querySelector('.modal-overlay');

function abreModal() {
  if (modalOverlay) {
    modalOverlay.classList.add('ativo');
  }
}

function fechaModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('ativo');
  }
}

if (botaoAjudaDestaque) {
  botaoAjudaDestaque.addEventListener('click', abreModal);
}

if (botaoAjudaMenu) {
  botaoAjudaMenu.addEventListener('click', abreModal);
}

if (botaoFecharModal) {
  botaoFecharModal.addEventListener('click', fechaModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', function(event) {
    if (event.target === modalOverlay) {
      fechaModal();
    }
  });
}

// FUNCIONALIDADES DE ACESSIBILIDADE

// 1. Controle do Tamanho da Fonte
const btnAumentar = document.getElementById('btn-aumentar');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnResetar = document.getElementById('btn-resetar');

let tamanhoFonteAtual = 16;
const tamanhoMinimo = 12;
const tamanhoMaximo = 24;

if (btnAumentar) {
  btnAumentar.addEventListener('click', function() {
    if (tamanhoFonteAtual < tamanhoMaximo) {
      tamanhoFonteAtual += 2;
      document.documentElement.style.setProperty('--tamanho-fonte-base', `${tamanhoFonteAtual}px`);
    }
  });
}

if (btnDiminuir) {
  btnDiminuir.addEventListener('click', function() {
    if (tamanhoFonteAtual > tamanhoMinimo) {
      tamanhoFonteAtual -= 2;
      document.documentElement.style.setProperty('--tamanho-fonte-base', `${tamanhoFonteAtual}px`);
    }
  });
}

if (btnResetar) {
  btnResetar.addEventListener('click', function() {
    tamanhoFonteAtual = 16;
    document.documentElement.style.setProperty('--tamanho-fonte-base', '16px');
  });
}

// 2. Leitura em Voz Alta (Web Speech API)
const btnLerVoz = document.getElementById('btn-ler-voz');

if (btnLerVoz) {
  btnLerVoz.addEventListener('click', function() {
    // Se estiver lendo, cancela a leitura ao clicar novamente
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      btnLerVoz.textContent = '🔊 Ler em Voz Alta';
      return;
    }

    // Identifica o bloco visível na página para realizar a leitura
    const secaoAtiva = document.querySelector('.bloco-secao[style*="display: block"]') 
                       || document.querySelector('#bloco-inicio');

    const textoParaLer = secaoAtiva ? secaoAtiva.innerText : document.querySelector('main').innerText;

    if ('speechSynthesis' in window) {
      const uttermance = new SpeechSynthesisUtterance(textoParaLer);
      uttermance.lang = 'pt-BR';
      uttermance.rate = 1.0;

      uttermance.onstart = function() {
        btnLerVoz.textContent = '⏹️ Parar Leitura';
      };

      uttermance.onend = function() {
        btnLerVoz.textContent = '🔊 Ler em Voz Alta';
      };

      uttermance.onerror = function() {
        btnLerVoz.textContent = '🔊 Ler em Voz Alta';
      };

      window.speechSynthesis.speak(uttermance);
    } else {
      alert('Seu navegador não suporta a função de leitura em voz alta.');
    }
  });
}
