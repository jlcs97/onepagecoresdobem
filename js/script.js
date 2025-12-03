// ==========================================================
// FUNÇÃO PARA CARREGAR E EXIBIR OS DADOS DO LOCALSTORAGE
// (Chamada ao carregar a página e após cada envio de feedback)
// ==========================================================

function carregarFeedbacks() {
    const listaElemento = document.getElementById('feedbackList');
    const limparBtn = document.getElementById('limparFeedbacks');
    listaElemento.innerHTML = ''; // Limpa a lista antes de recarregar

    try {
        let feedbacks = JSON.parse(localStorage.getItem('siteCoresDoBem_Dados')) || [];

        if (feedbacks.length === 0) {
            listaElemento.innerHTML = '<p class="text-center text-secondary m-3">Nenhum feedback salvo localmente ainda.</p>';
            limparBtn.style.display = 'none';
            return;
        }

        limparBtn.style.display = 'block';

        // Ordena para mostrar o mais recente primeiro e itera sobre eles
        feedbacks.reverse().forEach((data, index) => {
            const item = document.createElement('div');
            // Classes do Bootstrap para um visual limpo de item de lista
            item.className = 'list-group-item list-group-item-action flex-column align-items-start mb-2 rounded shadow-sm';
            
            item.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1 text-primary fw-bold">${data.nome}</h6>
                    <small class="text-muted">${data.data.split(' ')[0]}</small>
                </div>
                <p class="mb-1 small">
                    <span class="fw-bold">Mês Favorito:</span> ${data.mesFavorito} | 
                    <span class="fw-bold">Sugestão:</span> ${data.mesSugerido}
                </p>
                <small class="text-break">${data.comentario}</small>
            `;
            listaElemento.appendChild(item);
        });

    } catch (e) {
        listaElemento.innerHTML = '<p class="text-danger m-3">Erro ao carregar dados do LocalStorage.</p>';
        console.error("Erro ao carregar feedbacks: ", e);
    }
}

// ==========================================================
// LÓGICA DE SUBMISSÃO DO FORMULÁRIO
// (Corrigida e funcional para salvar e atualizar a lista)
// ==========================================================

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Captura de Inputs
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const comentario = document.getElementById('comentario').value.trim(); 
    
    // Captura rádio selecionado (Mes Favorito)
    const mesFavoritoEl = document.querySelector('input[name="mesFavorito"]:checked');
    const mesFavorito = mesFavoritoEl ? mesFavoritoEl.value : 'Não informado';

    // Captura Mes Sugerido e trata a opção default
    let mesSugerido = document.getElementById('mesSugerido').value;
    if (mesSugerido === "" || mesSugerido === 'Selecione...') { 
        mesSugerido = 'Nenhum Sugerido';
    }

    // 2. Validação Básica
    // Esta validação irá funcionar corretamente agora
    if (nome === '' || email === '' || comentario === '') { 
        alert('Por favor, preencha os campos Nome, E-mail e Comentário.');
        return; 
    }
    
    // 3. Estruturação dos Dados
    const feedbackData = {
        nome,
        email,
        mesFavorito,
        mesSugerido,
        comentario,
        data: new Date().toLocaleString('pt-BR') 
    };

    // 4. Salva no LocalStorage
    try {
        let feedbacks = JSON.parse(localStorage.getItem('siteCoresDoBem_Dados')) || [];
        feedbacks.push(feedbackData);
        localStorage.setItem('siteCoresDoBem_Dados', JSON.stringify(feedbacks));
        
        // 5. Feedback, Limpeza e ATUALIZAÇÃO DA LISTA
        alert('Obrigado, ' + nome + '! Sua opinião foi salva com sucesso.');
        document.getElementById('feedbackForm').reset();
        carregarFeedbacks(); // Atualiza a lista exibida
    } catch (e) {
        alert('Ocorreu um erro ao salvar o feedback. Verifique o LocalStorage.');
        console.error("Erro ao acessar LocalStorage: ", e);
    }
});


// ==========================================================
// OUTRAS FUNÇÕES
// ==========================================================

// Função para Limpar Todos os Dados Salvos
document.getElementById('limparFeedbacks').addEventListener('click', function() {
    if (confirm('Tem certeza de que deseja apagar TODOS os feedbacks salvos localmente?')) {
        localStorage.removeItem('siteCoresDoBem_Dados');
        carregarFeedbacks(); // Recarrega a lista vazia
    }
});

// Carrega os feedbacks assim que a página estiver pronta
window.addEventListener('load', carregarFeedbacks);