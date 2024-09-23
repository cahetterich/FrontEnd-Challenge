// <!-- JavaScript Customizado -->
  
        // Função para alternar a exibição das senhas
        function togglePasswordVisibility(toggleId, inputId, iconId) {
            const toggle = document.getElementById(toggleId);
            const input = document.getElementById(inputId);
            const icon = document.getElementById(iconId);
            
            toggle.addEventListener('click', function () {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                icon.classList.toggle('fa-eye-slash');
            });
        }

        // Exibir/Ocultar senha
        togglePasswordVisibility('togglePassword', 'password', 'togglePasswordIcon');
        togglePasswordVisibility('toggleConfirmPassword', 'confirmPassword', 'toggleConfirmPasswordIcon');

        // Validação do formulário
        document.getElementById('signupForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio do formulário para evitar recarga da página
            
            let isValid = true;

            // Limpar mensagens de erro
            document.getElementById('firstNameError').textContent = '';
            document.getElementById('lastNameError').textContent = '';
            document.getElementById('emailError').textContent = '';
            document.getElementById('passwordError').textContent = '';
            document.getElementById('confirmPasswordError').textContent = '';

            // Verificar primeiro nome
            const firstName = document.getElementById('firstName').value.trim();
            if (firstName === '') {
                document.getElementById('firstNameError').textContent = 'Por favor, insira seu primeiro nome.';
                isValid = false;
            }

            // Verificar sobrenome
            const lastName = document.getElementById('lastName').value.trim();
            if (lastName === '') {
                document.getElementById('lastNameError').textContent = 'Por favor, insira seu sobrenome.';
                isValid = false;
            }

            // Verificar e-mail
            const email = document.getElementById('email').value.trim();
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (email === '') {
                document.getElementById('emailError').textContent = 'Por favor, insira seu e-mail.';
                isValid = false;
            } else if (!emailPattern.test(email)) {
                document.getElementById('emailError').textContent = 'Por favor, insira um e-mail válido.';
                isValid = false;
            }

            // Verificar senha
            const password = document.getElementById('password').value;
            if (password.length < 6) {
                document.getElementById('passwordError').textContent = 'A senha deve ter pelo menos 6 caracteres.';
                isValid = false;
            }

            // Verificar confirmação de senha
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (confirmPassword !== password) {
                document.getElementById('confirmPasswordError').textContent = 'As senhas não coincidem.';
                isValid = false;
            }

            // Se for válido, exibir os dados no console (futuro envio para backend)
            if (isValid) {
                console.log({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                });
            }
        });
    
        //back end

        document.getElementById('signupForm').addEventListener('submit', async function(event) {
            event.preventDefault();
        
            // Coletar os dados do formulário
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const username = document.getElementById('username').value.trim(); 
            const usernameError = document.getElementById('usernameError');
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (username === '') {
                usernameError.textContent = 'Por favor, insira um username.';
                isValid = false;
            } else {
                usernameError.textContent = '';
            }
                    
            let isValid = true;        
                   
            if (isValid) {
                try {
                    const response = await fetch('http://localhost:8080/api/auth/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ firstName, lastName, email, username, password })
                    });
        
                    if (response.ok) {
                        alert('Usuário registrado com sucesso!');
                        window.location.href = './login.html';
                    } else {
                        const error = await response.text();
                        alert(error);
                    }
                } catch (error) {
                    console.error('Erro:', error);
                }
            }
        });
        