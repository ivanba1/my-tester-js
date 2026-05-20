// Страница тестирования

let currentQuestions = [];
let currentIndex = 0;
let userAnswers = [];
let startTime = null;

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    const config = localStorage.getItem('js_master_test_config');
    if (!config) {
        window.location.href = 'dashboard.html';
        return;
    }

    const testConfig = JSON.parse(config);
    
    // Загружаем вопросы согласно режиму
    if (testConfig.mode === 'random') {
        currentQuestions = getRandomQuestions(20);
    } else if (testConfig.mode === 'full') {
        currentQuestions = getAllQuestions();
    } else if (testConfig.mode === 'topic') {
        currentQuestions = getQuestionsByTopic(testConfig.topic, 20);
    }

    if (currentQuestions.length === 0) {
        alert('Нет вопросов для этого режима');
        window.location.href = 'dashboard.html';
        return;
    }

    userAnswers = new Array(currentQuestions.length).fill(null);
    startTime = Date.now();
    
    renderQuestion();
    
    // Привязываем обработчики кнопок
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevQuestion);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }
    
    if (finishBtn) {
        finishBtn.addEventListener('click', finishTest);
    }
});

function renderQuestion() {
    const question = currentQuestions[currentIndex];
    const questionText = document.getElementById('questionText');
    const optionsList = document.getElementById('optionsList');
    const currentSpan = document.getElementById('current');
    const totalSpan = document.getElementById('total');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (questionText) questionText.textContent = question.text;
    if (currentSpan) currentSpan.textContent = currentIndex + 1;
    if (totalSpan) totalSpan.textContent = currentQuestions.length;

    // Рендерим варианты ответов
    if (optionsList) {
        optionsList.innerHTML = '';
        question.options.forEach((option, idx) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            if (userAnswers[currentIndex] === idx) {
                optionDiv.classList.add('selected');
            }
            optionDiv.textContent = option;
            optionDiv.addEventListener('click', function() {
                selectOption(idx);
            });
            optionsList.appendChild(optionDiv);
        });
    }

    // Управление кнопками
    if (prevBtn) {
        prevBtn.disabled = (currentIndex === 0);
    }
    
    if (nextBtn) {
        if (currentIndex === currentQuestions.length - 1) {
            nextBtn.textContent = 'Завершить';
        } else {
            nextBtn.textContent = 'Далее';
        }
    }
}

function selectOption(optionIndex) {
    userAnswers[currentIndex] = optionIndex;
    renderQuestion();
}

function nextQuestion() {
    // Проверяем, что выбран ответ на текущий вопрос
    if (userAnswers[currentIndex] === null) {
        alert('Пожалуйста, выберите ответ перед тем как продолжить');
        return;
    }
    
    // Если это последний вопрос, завершаем тест
    if (currentIndex === currentQuestions.length - 1) {
        finishTest();
    } else {
        // Иначе переходим к следующему вопросу
        currentIndex++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
}

function finishTest() {
    // Проверяем, что на последний вопрос дан ответ (если мы завершаем досрочно)
    if (userAnswers[currentIndex] === null && currentIndex === currentQuestions.length - 1) {
        alert('Пожалуйста, выберите ответ на последний вопрос');
        return;
    }
    
    let correctCount = 0;
    currentQuestions.forEach((question, idx) => {
        if (userAnswers[idx] === question.correct) {
            correctCount++;
        }
    });
    
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const percent = Math.round((correctCount / currentQuestions.length) * 100);
    
    const currentUser = getCurrentUser();
    
    let modeText = '';
    const config = JSON.parse(localStorage.getItem('js_master_test_config'));
    
    if (config.mode === 'random') {
        modeText = '20 случайных вопросов';
    } else if (config.mode === 'full') {
        modeText = 'Все вопросы (' + currentQuestions.length + ')';
    } else if (config.mode === 'topic') {
        modeText = 'Тема: ' + config.topic + ' (20 вопросов)';
    }
    
    const result = {
        userId: currentUser.id,
        correct: correctCount,
        total: currentQuestions.length,
        percent: percent,
        timeSpent: timeSpent,
        mode: modeText,
        date: new Date().toISOString()
    };
    
    addResult(result);
    
    alert(`Тест завершен!\n\nПравильных ответов: ${correctCount}/${currentQuestions.length}\nПроцент: ${percent}%\nВремя: ${timeSpent} секунд`);
    
    localStorage.removeItem('js_master_test_config');
    window.location.href = 'dashboard.html';
}
