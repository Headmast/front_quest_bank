// --- Уровни ---
const levels = [
    {
        id: 'level1',
        title: 'Доисторическая эпоха',
        desc: 'Первобытный банкинг и первые банкиры.',
        thumb: 'assets/images/levels/level2.jpg',
        type: 'internal-hard' // вариант усложнённых настроек
    },

    {
        id: 'level2',
        title: 'Наши дни',
        desc: 'Самые современные банковские услуги..',
        thumb: 'assets/images/levels/level1.jpg',
        type: 'internal' // запускаем текущую игру
    },
    // {
    //     id: 'level2',
    //     title: 'Пример интеграции внешних продуктов',
    //     desc: 'Небольшой интерактивный рассказ о банковских услугах.',
    //     thumb: 'assets/images/levels/level3.png',
    //     type: 'link',
    //     href: 'twine-game.html'
    // },
    
    {
        id: 'level4',
        title: 'Чемпионат на скорость',
        desc: 'Накопите 10 очков быстрее, чем истечёт время.',
        thumb: 'assets/images/levels/level4.jpg',
        type: 'internal-timed'
    }
];

let selectedLevel = null;

function initLevelSelect() {
    const levelGrid = document.getElementById('level-grid');
    const titleEl = document.getElementById('level-title');
    const descEl = document.getElementById('level-desc');
    const playBtn = document.getElementById('play-btn');

    levels.forEach(lvl => {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        btn.innerHTML = `
            <img class="level-thumb" src="${lvl.thumb}" alt="${lvl.title}">
            <div class="level-title-overlay">${lvl.title}</div>
        `;
        btn.onclick = () => {
            selectedLevel = lvl;
            // визуально выделяем
            [...levelGrid.children].forEach(c => c.classList.remove('selected'));
            btn.classList.add('selected');
            // показываем описание
            titleEl.textContent = lvl.title;
            descEl.textContent = lvl.desc;
            playBtn.disabled = false;
            audioManager.playMusic('mainMenu');
        };
        levelGrid.appendChild(btn);
    });

    playBtn.addEventListener('click', () => {
        if (!selectedLevel) return;
        
        // Анимация скрытия экрана выбора уровней
        const levelScreen = document.getElementById('level-screen');
        levelScreen.classList.add('fade-out');
        
        // Запускаем игру после анимации
        setTimeout(() => {
            if (selectedLevel.type === 'link' && selectedLevel.href) {
                window.open(selectedLevel.href, '_blank');
                return;
            }
            // Внутренние режимы — запускаем на той же странице
            if (selectedLevel.type === 'internal') {
                mode = 'normal';
                applyGameResources('normal');
                startGame();
                return;
            }
            if (selectedLevel.type === 'internal-hard') {
                mode = 'hard';
                applyGameResources('hard');
                startGame();
                return;
            }
            if (selectedLevel.type === 'internal-timed') {
                mode = 'timed';
                applyGameResources('normal');
                startGame();
                return;
            }
        }, 300); // 300ms = время анимации
    });
}
