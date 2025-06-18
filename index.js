function showCadastro() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('cadastro-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('cadastro-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email.includes('@') || !email.includes('.')) {
        alert('Por favor, insira um email válido.');
        e.preventDefault();
    }

    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        e.preventDefault();
    }
});

document.getElementById('cadastro-form').addEventListener('submit', function(e) {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('cadastro-email').value;
    const password = document.getElementById('cadastro-password').value;
    const tipo = document.getElementById('tipo').value;

    if (nome.trim() === '') {
        alert('O nome é obrigatório.');
        e.preventDefault();
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Por favor, insira um email válido.');
        e.preventDefault();
    }

    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        e.preventDefault();
    }

    if (!tipo) {
        alert('Selecione um tipo de usuário.');
        e.preventDefault();
    }
});