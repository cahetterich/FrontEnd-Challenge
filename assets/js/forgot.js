// <!-- JavaScript -->
   
        document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio do formulário
            const email = document.getElementById('email').value;
            
            if (validateEmail(email)) {
                // Simular a exibição da mensagem de sucesso
                document.getElementById('successMessage').style.display = 'block';

                // Limpar o campo de e-mail após a submissão
                document.getElementById('email').value = '';

                // Aqui você pode adicionar a lógica para o backend futuro, como a integração com a API para envio de e-mail
                // Exemplo: fetch('/api/recuperacao-senha', { method: 'POST', body: JSON.stringify({ email }) });
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });

        // Função simples de validação de e-mail
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }
    