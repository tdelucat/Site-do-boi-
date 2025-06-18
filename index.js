function showCadastro() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('cadastro-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('cadastro-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// Simulação de banco de dados com localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let animais = JSON.parse(localStorage.getItem('animais')) || [];

// Função para verificar login e atualizar interface
function checkLogin() {
    const currentUser = localStorage.getItem('currentUser');
    const userGreeting = document.querySelectorAll('#user-greeting');
    const logoutLink = document.querySelectorAll('#logout');
    const loginLink = document.querySelectorAll('a[href="login.html"]');
    const cadastrarAnimalLink = document.querySelectorAll('#cadastrar-animal-link');

    if (currentUser) {
        const user = JSON.parse(currentUser);
        userGreeting.forEach(el => el.textContent = `Bem-vindo, ${user.nome}!`);
        logoutLink.forEach(el => el.style.display = 'inline');
        loginLink.forEach(el => el.style.display = 'none');
        cadastrarAnimalLink.forEach(el => el.style.display = 'inline');
    } else {
        userGreeting.forEach(el => el.textContent = '');
        logoutLink.forEach(el => el.style.display = 'none');
        loginLink.forEach(el => el.style.display = 'inline');
        cadastrarAnimalLink.forEach(el => el.style.display = 'none');
    }
}

// Função para exibir anúncios
function displayAnimais() {
    const adsGrid = document.getElementById('ads-grid');
    if (!adsGrid) return;

    adsGrid.innerHTML = '';
    const defaultAnimais = [
        { nome: 'Nelore Mocho', raca: 'Nelore', idade: 24, peso: 450, preco: 5400, localizacao: 'Fazenda Boa Vista', foto: 'https://via.placeholder.com/280x180' },
        { nome: 'Angus', raca: 'Angus', idade: 18, peso: 380, preco: 6200, localizacao: 'Fazenda Santa Rita', foto: 'https://via.placeholder.com/280x180' },
    ];

    [...defaultAnimais, ...animais].forEach(animal => {
        const card = document.createElement('div');
        card.className = 'ad-card';
        card.innerHTML = `
            <div class="ad-image" style="background-image: url('${animal.foto}');"></div>
            <div class="ad-info">
                <h3>${animal.nome || animal.raca} - ${animal.idade} meses</h3>
                <div class="ad-price">R$ ${animal.preco.toFixed(2).replace('.', ',')}</div>
                <div class="ad-details">
                    <span>${animal.peso} kg</span>
                    <span>${animal.localizacao}</span>
                </div>
                <a href="#" class="btn">Ver Detalhes</a>
            </div>
        `;
        adsGrid.appendChild(card);
    });
}

// Executar ao carregar a página
window.addEventListener('load', () => {
    checkLogin();
    displayAnimais();
});

// Login
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email.includes('@') || !email.includes('.')) {
        alert('Por favor, insira um email válido.');
        return;
    }

    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login bem-sucedido!');
        window.location.href = 'index.html';
    } else {
        alert('Email ou senha incorretos!');
    }
});

// Cadastro de usuário
document.getElementById('cadastro-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('cadastro-email').value;
    const password = document.getElementById('cadastro-password').value;
    const tipo = document.getElementById('tipo').value;

    if (nome.trim() === '') {
        alert('O nome é obrigatório.');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Por favor, insira um email válido.');
        return;
    }

    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    if (!tipo) {
        alert('Selecione um tipo de usuário.');
        return;
    }

    if (users.find(u => u.email === email)) {
        alert('Email já cadastrado!');
        return;
    }

    users.push({ nome, email, password, tipo });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Cadastro realizado com sucesso! Faça login.');
    showLogin();
});

// Cadastro de animal
document.getElementById('cadastrar-animal-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Faça login para cadastrar um animal!');
        window.location.href = 'login.html';
        return;
    }

    const nome = document.getElementById('animal-nome').value;
    const raca = document.getElementById('animal-raca').value;
    const idade = parseInt(document.getElementById('animal-idade').value);
    const peso = parseInt(document.getElementById('animal-peso').value);
    const preco = parseFloat(document.getElementById('animal-preco').value);
    const localizacao = document.getElementById('animal-localizacao').value;
    const foto = document.getElementById('animal-foto').value || 'https://via.placeholder.com/280x180';
    const descricao = document.getElementById('animal-descricao').value;

    if (!raca || !idade || !peso || !preco || !localizacao) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    if (idade <= 0 || peso <= 0 || preco <= 0) {
        alert('Idade, peso e preço devem ser valores positivos!');
        return;
    }

    animais.push({ nome, raca, idade, peso, preco, localizacao, foto, descricao });
    localStorage.setItem('animais', JSON.stringify(animais));
    alert('Animal cadastrado com sucesso!');
    window.location.href = 'index.html';
});

// Logout
document.querySelectorAll('#logout').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        alert('Logout realizado com sucesso!');
        window.location.href = 'index.html';
    });
});

// Verificar login antes de acessar página de cadastro
if (window.location.pathname.includes('cadastrar-animal.html') && !localStorage.getItem('currentUser')) {
    alert('Faça login para cadastrar um animal!');
    window.location.href = 'login.html';
}