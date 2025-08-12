const urlEndereco = 'https://go-wash-api.onrender.com/api/auth/address/3';

async function excluirEndereco(id, rowElement) {
    let user = localStorage.getItem('user');
    let token = user ? JSON.parse(user).access_token : '';

    if (!token) {
        alert('Token de acesso não encontrado. Faça login novamente.');
        return;
    }

    const urlComId = `${urlEndereco}/${id}`;

    try {
        let response = await fetch(urlComId, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        });

        if (response.ok) {
            alert('Endereço excluído com sucesso!');
            if (rowElement && rowElement.parentNode) {
                rowElement.parentNode.removeChild(rowElement); 
            }
        } else {
            const errorData = await response.json();
            console.error('Erro ao excluir endereço:', errorData);
            alert(`Erro ao excluir endereço: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Erro de conexão com a API:', error);
        alert('Erro ao conectar com o servidor. Tente novamente.');
    }
}

export { excluirEndereco };
