// --- Модальное окно и управление ---
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const btnContinue = document.getElementById('btn-continue');
const btnReplay = document.getElementById('btn-replay');
const btnMenu = document.getElementById('btn-menu');

// Таймер для режима timed
let timerId = null, remaining = 60;
function startTimer() {
    remaining = 60;
    timerId = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            clearInterval(timerId);
            timerId = null;
            endGame(score >= 10);
        }
    }, 1000);
}

function pauseTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
function resumeTimer() { if (mode === 'timed' && !timerId) startTimer(); }

// Пауза/результат
let isPaused = false;
function showPause() {
    if (isPaused) return;
    isPaused = true;
    disableButtons();
    pauseTimer();
    modalTitle.textContent = 'Пауза';
    modalText.textContent = 'Игра приостановлена.';
    btnContinue.style.display = '';
    modal.classList.remove('hidden');
}

function hideModal() {
    modal.classList.add('hidden');
}

function continueGame() {
    hideModal();
    isPaused = false;
    enableButtons();
    resumeTimer();
}

function endGame(won) {
    disableButtons();
    pauseTimer();
    modalTitle.textContent = won ? 'Результат: Победа' : 'Результат: Поражение';
    modalText.textContent = won ? 'Вы набрали 10 очков. Отличная работа!' : 'Вы достигли лимита ошибок. Попробуйте снова!';
    btnContinue.style.display = 'none';
    modal.classList.remove('hidden');
}

// Кнопки модалки
btnContinue.addEventListener('click', continueGame);
btnReplay.addEventListener('click', () => {
    hideModal();
    isPaused = false;
    startGame();
});
btnMenu.addEventListener('click', () => {
    hideModal();
    isPaused = false;
    backToMenu();
});

function backToMenu() {
    pauseTimer();
    document.getElementById('game-screen').classList.add('hidden');
    const levelScreen = document.getElementById('level-screen');
    levelScreen.classList.remove('fade-out'); // Убираем класс анимации
    openMenuBtn.classList.add('hidden');
    levelScreen.classList.remove('hidden');
}

// Горячая клавиша 'm' — меню (пауза)
window.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        // показываем паузу только если игровой экран активен
        if (!document.getElementById('game-screen').classList.contains('hidden')) {
            showPause();
        }
    }
});

openMenuBtn.addEventListener('click', () => {
    if (!document.getElementById('game-screen').classList.contains('hidden')) {
        showPause();
    }
});
