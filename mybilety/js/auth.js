// Страница авторизации

document.addEventListener('DOMContentLoaded', function() {
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const doRegisterBtn = document.getElementById('doRegisterBtn');
    const doLoginBtn = document.getElementById('doLoginBtn');

    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', function() {
            registerForm.style.display = 'block';
            loginForm.style.display = 'none';
        });
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', function() {
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    if (doRegisterBtn) {
        doRegisterBtn.addEventListener('click', function() {
            const username = document.getElementById('regUsername').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirm').value;
            const errorEl = document.getElementById('regError');

            if (!username || !password) {
                errorEl.textContent = 'Заполните все поля';
                return;
            }

            if (password !== confirm) {
                errorEl.textContent = 'Пароли не совпадают';
                return;
            }

            const users = getUsers();
            if (users.find(u => u.username === username)) {
                errorEl.textContent = 'Пользователь уже существует';
                return;
            }

            const newUser = {
                id: Date.now(),
                username: username,
                password: password
            };

            users.push(newUser);
            saveUsers(users);
            setCurrentUser({ id: newUser.id, username: newUser.username });

            window.location.href = 'dashboard.html';
        });
    }

    if (doLoginBtn) {
        doLoginBtn.addEventListener('click', function() {
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            const errorEl = document.getElementById('loginError');

            const users = getUsers();
            const user = users.find(u => u.username === username && u.password === password);

            if (!user) {
                errorEl.textContent = 'Неверное имя пользователя или пароль';
                return;
            }

            setCurrentUser({ id: user.id, username: user.username });
            window.location.href = 'dashboard.html';
        });
    }
});