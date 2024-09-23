document.getElementById('editProfileForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = './login.html';
        return;
    }

    // Coletar os dados do formulário
    const firstName = document.getElementById('profileName').value.trim();
    const lastName = document.getElementById('profileLastName').value.trim(); // Adicione este campo no HTML
    const email = document.getElementById('profileEmail').value.trim();
    const phone = document.getElementById('profilePhone').value.trim();
    const city = document.getElementById('profileCity').value.trim();
    // Coleta de outras informações conforme necessário

    try {
        const response = await fetch('http://localhost:8080/api/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ firstName, lastName, email, phone, city })
        });

        if (response.ok) {
            alert('Perfil atualizado com sucesso!');
            window.location.href = './perfil.html';
        } else {
            const error = await response.text();
            alert(error);
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});
