// --- Игровые данные ---
const requests = [
    { text: 'У меня много мелочи, хочу поменять на крупные купюры', answer: 'мелкие' },
    { text: 'Мне нужно разменять эту тысячную купюру', answer: 'крупные' },
    { text: 'Хочу обменять доллары на рубли', answer: 'валюта' },
    { text: 'Нужно отправить деньги родственникам в другой город', answer: 'перевод' },
    { text: 'У меня куча монет, поменяйте на банкноты', answer: 'мелкие' },
    { text: 'Разбейте мне эту пятитысячную, пожалуйста', answer: 'крупные' },
    { text: 'Мне нужны евро вместо рублей', answer: 'валюта' },
    { text: 'Переведите деньги на карту жены', answer: 'перевод' },
    { text: 'Хочется избавиться от всей этой мелочевки', answer: 'мелкие' },
    { text: 'Поменяйте крупную банкноту на разменные', answer: 'крупные' },
    { text: 'Продам вам доллары по курсу', answer: 'валюта' },
    { text: 'Нужно послать денег маме в деревню', answer: 'перевод' }
];

const answers = [
    { label: 'Разменять мелкие деньги', value: 'мелкие' },
    { label: 'Разменять крупные деньги', value: 'крупные' },
    { label: 'Сделать обмен валюты', value: 'валюта' },
    { label: 'Отправить перевод', value: 'перевод' }
];

let score = 0, visitorCount = 0, currentRequest = '';
let mode = 'normal'; // normal | hard | timed

// DOM элементы
const speechEl = document.getElementById('speech-text');
const visitorImg = document.getElementById('visitor-img');
const btnContainer = document.getElementById('answer-buttons');
const toast = document.getElementById('toast');
const toastIcon = document.getElementById('toast-icon');
const toastText = document.getElementById('toast-text');
const openMenuBtn = document.getElementById('open-menu-btn');

function startGame() {
    showGameScreen();
    initGame();
}

function initGame() {
    toast.style.display = 'none';
    toastText.textContent = '';
    score = 0; visitorCount = 0; currentRequest = '';
    
    // Скрываем таймер в начале каждой игры
    hideTimer();
    
    btnContainer.innerHTML = '';
    answers.forEach(a => {
        const btn = document.createElement('button');
        btn.textContent = a.label;
        btn.onclick = () => select(a.value);
        btnContainer.appendChild(btn);
    });
    nextVisitor();
    if (mode === 'timed') startTimer();
}

function nextVisitor() {
    // В режиме "на время" не останавливаем игру по очкам
    if (mode !== 'timed') {
        if (score >= 10) { return endGame(true); }
        if (score <= -5) { return endGame(false); }
    }
    visitorCount++;
    updateScore();

    // Новый запрос и персонаж
    let req = requests[Math.floor(Math.random() * requests.length)];
    if (mode === 'hard') {
        // В «hard» повышаем шанс запутанных формулировок (просто берём ещё раз случай)
        if (Math.random() < 0.5) req = requests[Math.floor(Math.random() * requests.length)];
    }
    currentRequest = req.answer;
    speechEl.textContent = req.text;
    const vis = visitors[Math.floor(Math.random() * visitors.length)];
    visitorImg.src = vis.img;
    
    // Проигрываем звук шагов клиента
    audioManager.playSound('clientSteps');
}

function select(value) {
    // 1) посчитать результат
    const wasCorrect = (value === currentRequest);
    score += wasCorrect ? 1 : -1;
    updateScore();

    // 2) сразу переключить на нового посетителя и новый вопрос
    nextVisitor(); // это обновит персонажа, вопрос и проверит победу/поражение

    // Если наступила победа/поражение, nextVisitor сам покажет тост и отключит кнопки,
    // в этом случае второй тост не нужен (но не в режиме timed):
    if (mode !== 'timed' && (score >= 10 || score <= -5)) return;

    // 3) через короткую задержку показать тост по предыдущему ответу
    setTimeout(() => {
        toastMsg(wasCorrect ? '✅ Верно +1' : '❌ Ошибка -1', 'assets/images/ui/coin-icon.png');
        // Проигрываем звук результата
        audioManager.playSound(wasCorrect ? 'correctAnswer' : 'wrongAnswer');
    }, 150); // 100–200 мс достаточно, чтобы экран уже сменился
}

function toastMsg(msg, iconSrc) {
    toastText.textContent = msg;
    toastIcon.src = iconSrc;
    toast.style.display = 'flex';
    setTimeout(() => { toast.style.display = 'none'; }, 2000);
}

function updateScore() {
    document.getElementById('score').textContent = score;
    // document.getElementById('visitor-count').textContent = visitorCount;
}

function disableButtons() {
    [...btnContainer.querySelectorAll('button')].forEach(b => b.disabled = true);
}

function enableButtons() {
    [...btnContainer.querySelectorAll('button')].forEach(b => b.disabled = false);
}
