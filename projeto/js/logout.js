async function logout() {
 
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user.token) {
        alert('Usuário não autenticado. Faça login novamente.');
        return;
    }

    const url = "https://go-wash-api.onrender.com/api/auth/logout";

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
            }
        });

        if (response.ok) {
            
            localStorage.removeItem('user');
            alert('Logout realizado com sucesso!');
            window.location.href = 'login.html'; 
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Erro ao realizar o logout. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao realizar logout:', error);
        alert('Ocorreu um erro ao realizar o logout. Tente novamente.');
    }
}
