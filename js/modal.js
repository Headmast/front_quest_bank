// --- Модальное окно и управление ---
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const btnContinue = document.getElementById('btn-continue');
const btnReplay = document.getElementById('btn-replay');
const btnMenu = document.getElementById('btn-menu');

// Таймер для режима timed
let timerId = null, remaining = 30;
function startTimer() {
    remaining = 30;
    updateTimerDisplay();
    showTimer();
    timerId = setInterval(() => {
        remaining--;
        updateTimerDisplay();
        if (remaining <= 0) {
            clearInterval(timerId);
            timerId = null;
            endTimedGame();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerEl = document.getElementById('timer');
    if (timerEl) {
        timerEl.textContent = remaining;
    }
}

function showTimer() {
    const timerItem = document.getElementById('timer-item');
    if (timerItem) {
        timerItem.classList.remove('hidden');
    }
}

function hideTimer() {
    const timerItem = document.getElementById('timer-item');
    if (timerItem) {
        timerItem.classList.add('hidden');
    }
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
    hideTimer();
    modalTitle.textContent = won ? 'Результат: Победа' : 'Результат: Поражение';
    modalText.textContent = won ? 'Вы набрали 10 очков. Отличная работа!' : 'Вы достигли лимита ошибок. Попробуйте снова!';
    btnContinue.style.display = 'none';
    modal.classList.remove('hidden');
}

function endTimedGame() {
    disableButtons();
    pauseTimer();
    hideTimer();
    modalTitle.textContent = 'Время истекло!';
    modalText.textContent = `Ваш результат: ${score} ${score === 1 ? 'балл' : score < 5 ? 'балла' : 'баллов'} за 30 секунд.`;
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
    hideTimer();
    document.getElementById('game-screen').classList.add('hidden');
    const levelScreen = document.getElementById('level-screen');
    levelScreen.classList.remove('fade-out'); // Убираем класс анимации
    openMenuBtn.classList.add('hidden');
    showMainMenu();
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
