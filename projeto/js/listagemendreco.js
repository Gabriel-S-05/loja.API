const urlEnderecoCadastro = 'https://go-wash-api.onrender.com/api/auth/address';

async function listarEnderecos() {
    let user = localStorage.getItem('user');
    let token = user ? JSON.parse(user).access_token : '';

    if (!token) {
        alert('Token de acesso não encontrado. Faça login novamente.');
        return;
    }

    try {
        let response = await fetch(urlEnderecoCadastro, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        if (response.ok) {
            let enderecos = await response.json();
            console.log('Endereços recebidos:', enderecos);
            exibirEnderecos(enderecos.data);
        } else {
            console.error('Erro ao buscar endereços:', response.statusText);
            alert('Erro ao buscar endereços. Tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Erro de conexão. Verifique sua internet ou tente mais tarde.');
    }
}

function exibirEnderecos(enderecos) {
    if (!Array.isArray(enderecos) || enderecos.length === 0) {
        const noAddressMessage = document.createElement('tr');
        noAddressMessage.innerHTML = '<td colspan="6">Nenhum endereço cadastrado.</td>';
        document.querySelector("tbody").appendChild(noAddressMessage);
        return;
    }

    let tbody = document.querySelector("tbody");
    let row = "";

    enderecos.forEach(endereco => {
        row += `
            <tr id="row-${endereco.id}">
                <th>${endereco.title}</th>
                <th>${endereco.cep}</th>
                <th>${endereco.number}</th>
                <th>${endereco.complement}</th>
                <th><button onclick="atualizarEndereco(${endereco.id})">Atualizar</button></th>
                <th><button onclick="deletarLinha(${endereco.id}, 'row-${endereco.id}')">Deletar</button></th>
            </tr>
        `;
    });

    tbody.innerHTML = row;
}

function atualizarEndereco(id) {
    window.location.href = `editar-endereco.html?id=${id}`;
}

async function deletarLinha(id, rowId) {
    let user = localStorage.getItem('user');
    let token = user ? JSON.parse(user).access_token : '';

    if (!token) {
        alert('Token de acesso não encontrado. Faça login novamente.');
        return;
    }

    const urlComId = `${urlEnderecoCadastro}/${id}`;

    try {
        let response = await fetch(urlComId, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        });

        if (response.ok) {
            alert('Endereço excluído com sucesso!');
            const rowElement = document.getElementById(rowId);
            if (rowElement) rowElement.remove(); 
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

listarEnderecos();
