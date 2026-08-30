// PASSO 3 & 4: Declarar variáveis e acessar elementos HTML usando document.querySelector
const botaoAjudaDestaque = document.querySelector('.botao-ajuda-destaque');
const botaoAjudaMenu = document.querySelector('.botao-ajuda-menu');
const botaoFecharModal = document.querySelector('.botao-fechar-modal');
const modalOverlay = document.querySelector('.modal-overlay');

// PASSO 6: Definir as funções abreModal e fechaModal
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

// PASSO 5: Adicionar eventos de clique nos botões
if (botaoAjudaDestaque) {
  botaoAjudaDestaque.addEventListener('click', abreModal);
}

if (botaoAjudaMenu) {
  botaoAjudaMenu.addEventListener('click', abreModal);
}

if (botaoFecharModal) {
  botaoFecharModal.addEventListener('click', fechaModal);
}

// Fechar o modal caso o usuário clique na área escura (overlay) fora da caixa
if (modalOverlay) {
  modalOverlay.addEventListener('click', function(event) {
    if (event.target === modalOverlay) {
      fechaModal();
    }
  });
}
