// --- Управление ресурсами ---
function getGameResources(gameMode) {
    const resources = {
        normal: {
            visitors: [
                { img: 'assets/images/visitors/visitor1.png' },
                { img: 'assets/images/visitors/visitor2.png' },
                { img: 'assets/images/visitors/visitor3.png' },
                { img: 'assets/images/visitors/visitor4.png' }
            ],
            background: 'assets/images/backgrounds/bank-bg.png',
            speech: 'assets/images/ui/speech.png'
        },
        hard: {
            visitors: [
                { img: 'assets/images/visitors/ovisitor1.png' },
                { img: 'assets/images/visitors/ovisitor2.png' },
                { img: 'assets/images/visitors/ovisitor3.png' },
                { img: 'assets/images/visitors/ovisitor4.png' }
            ],
            background: 'assets/images/backgrounds/obank-bg.png',
            speech: 'assets/images/ui/ospeech.png'
        },
        timed: {
            visitors: [
                { img: 'assets/images/visitors/visitor1.png' },
                { img: 'assets/images/visitors/visitor2.png' },
                { img: 'assets/images/visitors/visitor3.png' },
                { img: 'assets/images/visitors/visitor4.png' }
            ],
            background: 'assets/images/backgrounds/bank-bg.png',
            speech: 'assets/images/ui/speech.png'
        }
    };
    
    return resources[gameMode] || resources.normal;
}

// --- Текущие ресурсы игры ---
let currentResources = getGameResources('normal');
let visitors = currentResources.visitors;

// Функция применения ресурсов к интерфейсу
function applyGameResources(gameMode) {
    currentResources = getGameResources(gameMode);
    visitors = currentResources.visitors;
    
    // Обновляем фон body
    document.body.style.backgroundImage = `url('${currentResources.background}'), linear-gradient(#F5F5DC, #F5F5DC)`;
    
    // Обновляем изображение речевого пузыря
    const speechImg = document.querySelector('.speech');
    if (speechImg) {
        speechImg.src = currentResources.speech;
    }
    
    // Если игра уже запущена, обновляем текущего персонажа
    const visitorImg = document.getElementById('visitor-img');
    if (visitorImg && !visitorImg.src.includes('visitor1.png')) {
        // Сохраняем текущий индекс персонажа и обновляем на соответствующий из новых ресурсов
        const currentIndex = getCurrentVisitorIndex(visitorImg.src);
        if (currentIndex >= 0 && currentIndex < visitors.length) {
            visitorImg.src = visitors[currentIndex].img;
        }
    }
}

// Вспомогательная функция для определения текущего индекса персонажа
function getCurrentVisitorIndex(currentSrc) {
    const filename = currentSrc.split('/').pop();
    if (filename.includes('visitor1') || filename.includes('ovisitor1')) return 0;
    if (filename.includes('visitor2') || filename.includes('ovisitor2')) return 1;
    if (filename.includes('visitor3') || filename.includes('ovisitor3')) return 2;
    if (filename.includes('visitor4') || filename.includes('ovisitor4')) return 3;
    return 0; // по умолчанию первый
}
