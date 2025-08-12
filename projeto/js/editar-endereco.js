const urlApi = 'https://go-wash-api.onrender.com/api/auth/address';

async function salvarEndereco() {
    let user = localStorage.getItem('user');
    let token = user ? JSON.parse(user).access_token : '';

    if (!token) {
        alert('Token de acesso não encontrado. Faça login novamente.');
        return;
    }


    const urlParams = new URLSearchParams(window.location.search);
    const enderecoId = urlParams.get('id');

    
    const urlComId = `${urlApi}/${enderecoId}`;

    const enderecoAtualizado = {
        title: document.getElementById('title').value,
        cep: document.getElementById('cep').value,
        address: document.getElementById('address').value,
        number: document.getElementById('number').value,
        complement: document.getElementById('complement').value
    };

    try {
        let response = await fetch(urlComId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(enderecoAtualizado)
        });

        if (response.ok) {
            const result = await response.json();
            if (result && (result.data || Object.keys(result).length > 0)) {
                alert('Endereço atualizado com sucesso!');
                window.location.href = 'http://127.0.0.1:5500/projeto/view/listagemendereco.html'; 
            } else {
                alert('Resposta inesperada da API. Verifique os dados enviados.');
            }
        } else {
            alert(`Erro ao atualizar o endereço: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Erro ao conectar com a API:', error);
        alert('Erro de conexão. Tente novamente.');
    }
}
