document.addEventListener('DOMContentLoaded', function () {
    
    // Máscara para CNPJ
    function applyCNPJMask(value) {
        return value
            .replace(/\D/g, '') // Remove tudo que não é dígito
            .replace(/(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }

    const cnpjInput = document.getElementById('cnpj');
    cnpjInput.addEventListener('input', function () {
        cnpjInput.value = applyCNPJMask(cnpjInput.value);
    });

    // Máscara para telefone
    function applyPhoneMask(value) {
        return value
            .replace(/\D/g, '') 
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d{4})$/, "$1-$2");
    }

    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function () {
        phoneInput.value = applyPhoneMask(phoneInput.value);
    });

    // Função para alternar a exibição da senha
    const togglePassword = document.querySelectorAll('.fa-eye');
    togglePassword.forEach(icon => {
        icon.addEventListener('click', function () {
            const input = this.parentElement.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Validação de CNPJ
    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14) return false;

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) return false;

        return true;
    }

    // Validação de campos obrigatórios e senha
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Coletar os dados do formulário
        const companyName = document.getElementById('companyName').value;
        const cnpj = document.getElementById('cnpj').value;
        const contactName = document.getElementById('contactName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!companyName || !cnpj || !contactName || !email || !password || !confirmPassword) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (!validarCNPJ(cnpj)) {
            alert('CNPJ inválido.');
            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        // Preparar dados para envio
        const data = {
            companyName: companyName,
            cnpj: cnpj,
            contactName: contactName,
            email: email,
            phone: phone,
            password: password
        };

        console.log('Dados enviados:', JSON.stringify(data));

        // Aqui, no futuro, faremos o envio para um backend (API)
    });
});