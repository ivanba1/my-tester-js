// База вопросов (можно расширять до 800+)
const QUESTIONS_DATABASE = [
    {
        id: 1,
        text: "Какой оператор используется для строгого сравнения в JavaScript?",
        options: ["==", "=", "===", "!=="],
        correct: 2,
        topic: "Операторы"
    },
    {
        id: 2,
        text: "Как объявить переменную, которую нельзя изменить?",
        options: ["let", "var", "const", "static"],
        correct: 2,
        topic: "Переменные"
    },
    {
        id: 3,
        text: "Что выведет console.log(typeof null)?",
        options: ["null", "object", "undefined", "number"],
        correct: 1,
        topic: "Типы данных"
    },
    {
        id: 4,
        text: "Какой метод преобразует JSON строку в объект?",
        options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.decode()"],
        correct: 1,
        topic: "Объекты"
    },
    {
        id: 5,
        text: "Что такое замыкание в JavaScript?",
        options: ["Глобальная переменная", "Функция с доступом к внешней области видимости", "Встроенная функция", "Ошибка выполнения"],
        correct: 1,
        topic: "Функции"
    },
    {
        id: 6,
        text: "Как создать promise?",
        options: ["new Promise()", "Promise.new()", "new Async()", "createPromise()"],
        correct: 0,
        topic: "Асинхронность"
    },
    {
        id: 7,
        text: "Что делает метод map()?",
        options: [
            "Изменяет исходный массив",
            "Создает новый массив с результатами функции",
            "Фильтрует элементы",
            "Сортирует массив"
        ],
        correct: 1,
        topic: "Массивы"
    },
    {
        id: 8,
        text: "Как объявить стрелочную функцию?",
        options: [
            "function() => {}",
            "=> function() {}",
            "() => {}",
            "function => ()"
        ],
        correct: 2,
        topic: "Функции"
    },
    {
        id: 9,
        text: "Что такое event bubbling?",
        options: [
            "Всплытие события",
            "Остановка события",
            "Создание события",
            "Удаление события"
        ],
        correct: 0,
        topic: "DOM"
    },
    {
        id: 10,
        text: "Как получить доступ к элементу по id?",
        options: [
            "document.querySelector('.id')",
            "document.getElementById('id')",
            "document.getElementsByTagName('id')",
            "document.getElementByClass('id')"
        ],
        correct: 1,
        topic: "DOM"
    },
    {
        id: 11,
        text: "Что такое localStorage?",
        options: [
            "Серверное хранилище",
            "Локальное хранилище браузера",
            "База данных SQL",
            "Кэш браузера"
        ],
        correct: 1,
        topic: "Хранилище"
    },
    {
        id: 12,
        text: "Как проверить тип переменной?",
        options: ["typeof", "instanceof", "typeOf", "getType"],
        correct: 0,
        topic: "Типы данных"
    },
    {
        id: 13,
        text: "Что делает метод filter()?",
        options: [
            "Создает новый массив с элементами, прошедшими проверку",
            "Фильтрует исходный массив",
            "Удаляет элементы",
            "Сортирует массив"
        ],
        correct: 0,
        topic: "Массивы"
    },
    {
        id: 14,
        text: "Как объявить класс в ES6?",
        options: [
            "class MyClass {}",
            "function MyClass() {}",
            "object MyClass {}",
            "new MyClass()"
        ],
        correct: 0,
        topic: "ООП"
    },
    {
        id: 15,
        text: "Что такое async/await?",
        options: [
            "Синтаксис для работы с промисами",
            "Объявление переменных",
            "Циклы",
            "Условные операторы"
        ],
        correct: 0,
        topic: "Асинхронность"
    },
    {
        id: 16,
        text: "Как добавить элемент в конец массива?",
        options: ["push()", "pop()", "unshift()", "shift()"],
        correct: 0,
        topic: "Массивы"
    },
    {
        id: 17,
        text: "Что выведет console.log([] == false)?",
        options: ["true", "false", "undefined", "error"],
        correct: 0,
        topic: "Операторы"
    },
    {
        id: 18,
        text: "Как создать объект?",
        options: [
            "{}",
            "new Object()",
            "Object.create()",
            "Все варианты верны"
        ],
        correct: 3,
        topic: "Объекты"
    },
    {
        id: 19,
        text: "Что такое this в методе объекта?",
        options: [
            "Глобальный объект",
            "Сам объект",
            "Родительский объект",
            "undefined"
        ],
        correct: 1,
        topic: "Объекты"
    },
    {
        id: 20,
        text: "Как запустить цикл по массиву?",
        options: ["for", "forEach", "map", "Все варианты"],
        correct: 3,
        topic: "Массивы"
    }
];

function getAllTopics() {
    const topics = [...new Set(QUESTIONS_DATABASE.map(q => q.topic))];
    return topics;
}

function getRandomQuestions(count) {
    const shuffled = [...QUESTIONS_DATABASE];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

function getAllQuestions() {
    return [...QUESTIONS_DATABASE];
}

function getQuestionsByTopic(topic, count) {
    const filtered = QUESTIONS_DATABASE.filter(q => q.topic === topic);
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}