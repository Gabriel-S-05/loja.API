let URL = "https://go-wash-api.onrender.com/api/user";


async function Usuario() {
    
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpfCnpj = document.getElementById('cpf_cpnj').value;
    let birthday = document.getElementById('birthday').value;
    let terms = document.getElementById('terms').checked;

    
    if (!name || !email || !password || !cpfCnpj || !birthday || !terms) {
        alert("Por favor, preencha todos os campos e aceite os termos.");
        return;
    }

  
    const emailTeste = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTeste.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

   
    if (password.length < 6) {
        alert("A senha deve ter pelo menos 6 dígitos.");
        return;
    }



    try {
        
        let response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                cpf_cnpj: cpfCnpj,
                birthday: birthday,
                terms: terms,
                user_type_id: 1  
            })
        });

  
        if (response.ok) {
            let data = await response.json();
            alert("Cadastro realizado com sucesso!");
            window.location.href="http://127.0.0.1:5500/projeto/view/login.html";
        } else {
            let errorData = await response.json();
            if (errorData.data && errorData.data.errors && errorData.data.errors.cpf_cnpj) {
                alert("Erro: " + errorData.data.errors.cpf_cnpj[0]);
            } else {
                alert("Erro no cadastro. Verifique os dados e tente novamente.");
            }
        }
    } catch (error) {
        alert("Ocorreu um erro: " + error.message);
    }
}
