// --- Настройки звука ---
let settingsBtn, settingsModal, settingsClose, soundToggle, musicVolumeSlider, soundVolumeSlider, musicVolumeValue, soundVolumeValue;

function initSettings() {
    // Получаем элементы DOM
    settingsBtn = document.getElementById('settings-btn');
    settingsModal = document.getElementById('settings-modal');
    settingsClose = document.getElementById('settings-close');
    soundToggle = document.getElementById('sound-toggle');
    musicVolumeSlider = document.getElementById('music-volume');
    soundVolumeSlider = document.getElementById('sound-volume');
    musicVolumeValue = document.getElementById('music-volume-value');
    soundVolumeValue = document.getElementById('sound-volume-value');
    
    // Устанавливаем начальные значения
    soundToggle.checked = audioManager.getSoundEnabled();
    musicVolumeSlider.value = audioManager.getMusicVolume();
    soundVolumeSlider.value = audioManager.getSoundVolume();
    updateVolumeDisplays();
    
    // Обработчики событий
    settingsBtn.addEventListener('click', openSettings);
    settingsClose.addEventListener('click', closeSettings);
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !settingsModal.classList.contains('hidden')) {
            closeSettings();
        }
    });
    
    soundToggle.addEventListener('change', (e) => {
        audioManager.setSoundEnabled(e.target.checked);
        if (e.target.checked) {
            // Возобновляем музыку главного меню если находимся в меню
            if (!document.getElementById('level-screen').classList.contains('hidden')) {
                audioManager.playMusic('mainMenu');
            }
        }
    });
    
    musicVolumeSlider.addEventListener('input', (e) => {
        const volume = parseFloat(e.target.value);
        audioManager.setMusicVolume(volume);
        updateVolumeDisplays();
    });
    
    soundVolumeSlider.addEventListener('input', (e) => {
        const volume = parseFloat(e.target.value);
        audioManager.setSoundVolume(volume);
        updateVolumeDisplays();
        // Проигрываем тестовый звук
        audioManager.playSound('correctAnswer');
    });
    
    // Закрытие по клику вне модального окна
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            closeSettings();
        }
    });
}

function openSettings() {
    settingsModal.classList.remove('hidden');
}

function closeSettings() {
    settingsModal.classList.add('hidden');
}

function updateVolumeDisplays() {
    musicVolumeValue.textContent = Math.round(musicVolumeSlider.value * 100) + '%';
    soundVolumeValue.textContent = Math.round(soundVolumeSlider.value * 100) + '%';
}
