document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // CÓDIGO DO MODAL DE AJUDA
  // ==========================================
  const btnAjudaDestaque = document.querySelector('.botao-ajuda-destaque');
  const btnAjudaMenu = document.querySelector('.botao-ajuda-menu');
  const btnFecharModal = document.querySelector('.botao-fechar-modal');
  const modalOverlay = document.querySelector('.modal-overlay');

  function abrirModal() {
    if (modalOverlay) modalOverlay.classList.add('ativo');
  }

  function fecharModal() {
    if (modalOverlay) modalOverlay.classList.remove('ativo');
  }

  if (btnAjudaDestaque) btnAjudaDestaque.addEventListener('click', abrirModal);
  if (btnAjudaMenu) btnAjudaMenu.addEventListener('click', abrirModal);
  if (btnFecharModal) btnFecharModal.addEventListener('click', fecharModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) fecharModal();
    });
  }

  // ==========================================
  // CÓDIGO DE CONTROLE DE FONTE (ACESSIBILIDADE)
  // ==========================================

  // Step 3: Definir variáveis para o tamanho da fonte
  let tamanhoFonteAtual = 1; // 1rem como valor inicial
  const valorAdicionado = 0.1;
  const valorSubtraido = 0.1;

  // Step 5: Obter elementos HTML no JavaScript usando document.getElementById
  const botaoAumentar = document.getElementById('aumentar-fonte');
  const botaoDiminuir = document.getElementById('diminuir-fonte');

  // Step 6: Implementar as funções aumentaFonte() e diminuiFonte()
  function aumentaFonte() {
    tamanhoFonteAtual += valorAdicionado;
    document.documentElement.style.fontSize = tamanhoFonteAtual + 'rem';
  }

  function diminuiFonte() {
    // Evita que a fonte fique infinitamente pequena
    if (tamanhoFonteAtual > 0.6) {
      tamanhoFonteAtual -= valorSubtraido;
      document.documentElement.style.fontSize = tamanhoFonteAtual + 'rem';
    }
  }

  // Step 7: Adicionar ouvintes de evento (event listeners)
  if (botaoAumentar) {
    botaoAumentar.addEventListener('click', aumentaFonte);
  }

  if (botaoDiminuir) {
    botaoDiminuir.addEventListener('click', diminuiFonte);
  }

  // ==========================================
  // CÓDIGO DE LEITURA EM VOZ ALTA
  // ==========================================
  const btnLerVoz = document.getElementById('btn-ler-voz');

  if (btnLerVoz) {
    btnLerVoz.addEventListener('click', function() {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        btnLerVoz.textContent = '🔊 Ler em Voz Alta';
        return;
      }

      const secoes = document.querySelectorAll('.bloco-secao');
      let textoParaLer = '';

      secoes.forEach(function(secao) {
        if (window.getComputedStyle(secao).display !== 'none') {
          textoParaLer = secao.innerText;
        }
      });

      if (!textoParaLer) {
        textoParaLer = document.querySelector('main').innerText;
      }

      if ('speechSynthesis' in window) {
        const mensagem = new SpeechSynthesisUtterance(textoParaLer);
        mensagem.lang = 'pt-BR';

        mensagem.onstart = function() {
          btnLerVoz.textContent = '⏹️ Parar Leitura';
        };

        mensagem.onend = function() {
          btnLerVoz.textContent = '🔊 Ler em Voz Alta';
        };

        mensagem.onerror = function() {
          btnLerVoz.textContent = '🔊 Ler em Voz Alta';
        };

        window.speechSynthesis.speak(mensagem);
      } else {
        alert('Seu navegador não suporta a função de leitura em voz alta.');
      }
    });
  }

});
