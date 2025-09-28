document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cepInput');
    const consultarBtn = document.getElementById('consultarBtn');
    const resultadoDiv = document.getElementById('resultado');

    consultarBtn.addEventListener('click', consultarCEP);
    
    cepInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            consultarCEP();
        }
    });

    async function consultarCEP() {
        const cep = cepInput.value.replace(/\D/g, '');
        
        if (cep.length !== 8) {
            alert('CEP deve conter 8 números');
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const dados = await response.json();

            if (dados.erro) {
                alert('CEP não encontrado');
                resultadoDiv.style.display = 'none';
                return;
            }

            
            document.getElementById('rua').textContent = dados.logradouro || 'Não informado';
            document.getElementById('bairro').textContent = dados.bairro || 'Não informado';
            document.getElementById('cidade').textContent = dados.localidade || 'Não informado';
            document.getElementById('estado').textContent = dados.uf || 'Não informado';
            document.getElementById('ddd').textContent = dados.ddd || 'Não informado';

            resultadoDiv.style.display = 'block';
            
        } catch (error) {
            alert('Erro ao consultar CEP');
            console.error(error);
        }
    }
});