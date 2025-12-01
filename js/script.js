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
// O valor da opção "Clique para selecionar..." é ""
if (mesSugerido === "" || mesSugerido === 'Selecione...') { 
     mesSugerido = 'Nenhum Sugerido';
}

    // 2. Validação Básica
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
        data: new Date().toLocaleString('pt-BR') // Usando o formato PT-BR para a data
    };

    // 4. Salva no LocalStorage
    try {
        let feedbacks = JSON.parse(localStorage.getItem('siteCoresDoBem_Dados')) || [];
        feedbacks.push(feedbackData);
        localStorage.setItem('siteCoresDoBem_Dados', JSON.stringify(feedbacks));
        
        // 5. Feedback e Limpeza
        alert('Obrigado, ' + nome + '! Sua opinião foi salva com sucesso.');
        document.getElementById('feedbackForm').reset();
    } catch (e) {
        alert('Ocorreu um erro ao salvar o feedback. Verifique o LocalStorage.');
        console.error("Erro ao acessar LocalStorage: ", e);
    }
});