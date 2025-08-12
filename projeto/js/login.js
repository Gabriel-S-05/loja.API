const url = "https://go-wash-api.onrender.com/api/login";

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "user_type_id": 1, 
                "password": password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (api.ok) {
            let resposta = await api.json();
            localStorage.setItem('user', JSON.stringify(resposta));
  
            alert('Login realizado com sucesso!');
 
            window.location.href = 'http://127.0.0.1:5500/projeto/view/endereco.html'; 
            return false; 
        } else {
            let errorData = await api.json();
            alert(errorData.message || 'Erro ao fazer login. Verifique suas credenciais.');
            return false; 
        }
    } catch (error) {
        alert('Ocorreu um erro ao tentar realizar o login. Tente novamente mais tarde.');
        console.error('Erro:', error);

    }
}
