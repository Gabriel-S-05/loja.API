const urlEnderecoCadastro = 'https://go-wash-api.onrender.com/api/auth/address';

async function cadastrarEndereco() {
    const title = document.getElementById('title')?.value || '';
    const cep = document.getElementById('cep')?.value || '';
    const address = document.getElementById('address')?.value || '';
    const number = document.getElementById('number')?.value || '';
    const complement = document.getElementById('complement')?.value || '';

    let user = localStorage.getItem('user');
    let token = user ? JSON.parse(user).access_token : value;

    if (!token) {
        alert('Token de acesso não encontrado. Faça login novamente.');
        console.error('Token não encontrado ou inválido:', token);
        return;
    }

    console.log('Dados sendo enviados para a API:', {
        title, cep, address, number, complement
    });

    try {
        let response = await fetch(urlEnderecoCadastro, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "title": title,
                "cep": cep,
                "address": address,
                "number": number,
                "complement": complement
            })
        });

        if (response.ok) {
            let enderecoCadastrado = await response.json();
            console.log('Endereço cadastrado com sucesso:', enderecoCadastrado);
            alert('Endereço cadastrado com sucesso!');

            window.location = "http://127.0.0.1:5500/projeto/view/home.html"
        } else {
            let errorData = await response.json();
            console.error('Erro na resposta da API:', errorData);
            alert(errorData.message || 'Erro ao cadastrar endereço. Verifique os dados.');
        }
    } catch (networkError) {
        alert('Erro de conexão. Verifique sua internet ou tente mais tarde.');
        console.error('Erro de rede:', networkError);
    }
}


cadastrarEndereco();
