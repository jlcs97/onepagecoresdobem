
function carregarFeedbacks() {
    const listaElemento = document.getElementById('feedbackList');
    const limparBtn = document.getElementById('limparFeedbacks');
    listaElemento.innerHTML = ''; 

    try {
        let feedbacks = JSON.parse(localStorage.getItem('siteCoresDoBem_Dados')) || [];

        if (feedbacks.length === 0) {
            listaElemento.innerHTML = '<p class="text-center text-secondary m-3">Nenhum feedback salvo localmente ainda.</p>';
            limparBtn.style.display = 'none';
            return;
        }

        limparBtn.style.display = 'block';

        
        feedbacks.reverse().forEach((data, index) => {
            const item = document.createElement('div');
            
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


document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const comentario = document.getElementById('comentario').value.trim(); 
    
    
    const mesFavoritoEl = document.querySelector('input[name="mesFavorito"]:checked');
    const mesFavorito = mesFavoritoEl ? mesFavoritoEl.value : 'Não informado';

    
    let mesSugerido = document.getElementById('mesSugerido').value;
    if (mesSugerido === "" || mesSugerido === 'Selecione...') { 
        mesSugerido = 'Nenhum Sugerido';
    }

    
    if (nome === '' || email === '' || comentario === '') { 
        alert('Por favor, preencha os campos Nome, E-mail e Comentário.');
        return; 
    }
    
    
    const feedbackData = {
        nome,
        email,
        mesFavorito,
        mesSugerido,
        comentario,
        data: new Date().toLocaleString('pt-BR') 
    };

    
    try {
        let feedbacks = JSON.parse(localStorage.getItem('siteCoresDoBem_Dados')) || [];
        feedbacks.push(feedbackData);
        localStorage.setItem('siteCoresDoBem_Dados', JSON.stringify(feedbacks));
        
        
        alert('Obrigado, ' + nome + '! Sua opinião foi salva com sucesso.');
        document.getElementById('feedbackForm').reset();
        carregarFeedbacks(); 
    } catch (e) {
        alert('Ocorreu um erro ao salvar o feedback. Verifique o LocalStorage.');
        console.error("Erro ao acessar LocalStorage: ", e);
    }
});



document.getElementById('limparFeedbacks').addEventListener('click', function() {
    if (confirm('Tem certeza de que deseja apagar TODOS os feedbacks salvos localmente?')) {
        localStorage.removeItem('siteCoresDoBem_Dados');
        carregarFeedbacks(); 
    }
});


window.addEventListener('load', carregarFeedbacks);