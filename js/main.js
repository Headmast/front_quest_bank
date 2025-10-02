// --- Инициализация приложения ---
window.addEventListener('load', () => {
    // Инициализируем настройки
    initSettings();
    
    // Сначала скрываем все экраны
    document.getElementById('level-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    
    // БЫСТРАЯ ОТЛАДКА: автозапуск первой игры (закомментируйте для обычной работы)
    const DEBUG_AUTO_START = false;
    if (DEBUG_AUTO_START && !window.location.search) {
        mode = 'normal';
        applyGameResources('normal');
        showGameScreen();
        initGame();
        return;
    }
    
    // Проверяем URL параметры для автозапуска игры
    const params = new URLSearchParams(window.location.search);
    const l = params.get('l');
    if (l) {
        const map = {
            'level1': { type: 'internal', mode: 'normal' },
            'level3': { type: 'internal-hard', mode: 'hard' },
            'level4': { type: 'internal-timed', mode: 'timed' }
        };
        const conf = map[l];
        if (conf) {
            mode = conf.mode;
            applyGameResources(conf.mode);
            showGameScreen();
            initGame();
            return; // Не инициализируем level-screen
        }
    }
    
    // Если нет параметров уровня, показываем экран выбора уровней
    showMainMenu();
});

function showMainMenu() {
    document.getElementById('level-screen').classList.remove('hidden');
    document.getElementById('game-header').classList.add('hidden');
    //audioManager.playMusic('mainMenu');
    initLevelSelect();
}

function showGameScreen() {
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('game-header').classList.remove('hidden');
    document.getElementById('open-menu-btn').classList.remove('hidden');
    audioManager.playMusic('level');
}
