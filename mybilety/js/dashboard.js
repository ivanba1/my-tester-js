// Панель управления после входа

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Отображаем имя пользователя
    const userNameSpan = document.getElementById('userName');
    if (userNameSpan) {
        userNameSpan.textContent = currentUser.username;
    }

    // Кнопка выхода
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            clearCurrentUser();
            window.location.href = 'index.html';
        });
    }

    // Режимы тестирования
    const randomModeBtn = document.getElementById('randomMode');
    const fullModeBtn = document.getElementById('fullMode');
    const topicModeBtn = document.getElementById('topicMode');
    const topicSelect = document.getElementById('topicSelect');
    const startTestBtn = document.getElementById('startTestBtn');
    const selectedTopic = document.getElementById('selectedTopic');

    let currentMode = null;

    if (randomModeBtn) {
        randomModeBtn.addEventListener('click', function() {
            currentMode = 'random';
            topicSelect.classList.remove('active');
        });
    }

    if (fullModeBtn) {
        fullModeBtn.addEventListener('click', function() {
            currentMode = 'full';
            topicSelect.classList.remove('active');
        });
    }

    if (topicModeBtn) {
        topicModeBtn.addEventListener('click', function() {
            currentMode = 'topic';
            topicSelect.classList.add('active');
            
            // Заполняем список тем
            if (selectedTopic) {
                const topics = getAllTopics();
                selectedTopic.innerHTML = '<option value="">Выберите тему</option>';
                topics.forEach(topic => {
                    const option = document.createElement('option');
                    option.value = topic;
                    option.textContent = topic;
                    selectedTopic.appendChild(option);
                });
            }
        });
    }

    if (startTestBtn) {
        startTestBtn.addEventListener('click', function() {
            if (!currentMode) {
                alert('Выберите режим тестирования');
                return;
            }

            let testConfig = {
                mode: currentMode
            };

            if (currentMode === 'topic') {
                const topic = selectedTopic.value;
                if (!topic) {
                    alert('Выберите тему');
                    return;
                }
                testConfig.topic = topic;
            }

            localStorage.setItem('js_master_test_config', JSON.stringify(testConfig));
            window.location.href = 'test.html';
        });
    }

    // Загрузка рейтинга
    loadRating('personal_by_percent');

    // Переключение категорий рейтинга
    const ratingTabs = document.querySelectorAll('.rating-tab');
    ratingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            ratingTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            loadRating(category);
        });
    });
});

function loadRating(category) {
    const currentUser = getCurrentUser();
    const ratingBody = document.getElementById('ratingBody');
    
    if (!ratingBody) return;

    let results = [];
    
    if (category.startsWith('personal')) {
        const type = category.replace('personal_', '');
        results = getResultsByCategory(type, currentUser.id);
        if (results.length === 0) {
            ratingBody.innerHTML = '<tr><td colspan="6" class="empty-rating">Нет результатов. Пройдите тест!</td></tr>';
            return;
        }
    } else if (category.startsWith('global')) {
        const type = category.replace('global_', '');
        results = getGlobalRating(type);
        if (results.length === 0) {
            ratingBody.innerHTML = '<tr><td colspan="6" class="empty-rating">Нет результатов</td></tr>';
            return;
        }
    }

    ratingBody.innerHTML = '';
    
    results.forEach((result, index) => {
        const row = document.createElement('tr');
        const users = getUsers();
        const user = users.find(u => u.id === result.userId);
        const username = user ? user.username : 'Неизвестно';
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${username}</td>
            <td>${result.correct}/${result.total}</td>
            <td>${result.percent}%</td>
            <td>${result.timeSpent} сек</td>
            <td>${result.mode}</td>
        `;
        ratingBody.appendChild(row);
    });
}