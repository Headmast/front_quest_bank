// --- Аудио система ---
class AudioManager {
    constructor() {
        this.sounds = {};
        this.music = {};
        this.soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
        this.musicVolume = parseFloat(localStorage.getItem('musicVolume')) || 0.1;
        this.soundVolume = parseFloat(localStorage.getItem('soundVolume')) || 0.1;
        this.currentMusic = null;
        
        this.loadAudio();
    }
    
    loadAudio() {
        // Загружаем музыку
        this.music.mainMenu = new Audio('assets/sounds/Music of game/1. MAIN MENU OPTIONS.mp3');
        this.music.level = new Audio('assets/sounds/Music of game/2. LEVEL.mp3');
        
        // Загружаем звуки
        this.sounds.clientSteps = new Audio('assets/sounds/Sounds of game/12. Шаги клиентов.mp3');
        this.sounds.correctAnswer = new Audio('assets/sounds/Sounds of game/8. Верный ответ.mp3');
        this.sounds.wrongAnswer = new Audio('assets/sounds/Sounds of game/9. Ошибочный ответ.mp3');
        
        // Настройка музыки
        Object.values(this.music).forEach(audio => {
            audio.loop = true;
            audio.volume = this.musicVolume;
        });
        
        // Настройка звуков
        Object.values(this.sounds).forEach(audio => {
            audio.volume = this.soundVolume;
        });
    }
    
    playMusic(trackName) {
        if (!this.soundEnabled) return;
        
        // Останавливаем текущую музыку
        if (this.currentMusic == this.music[trackName]) {
            return
        }

        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
        
        // Запускаем новую
        if (this.music[trackName]) {
            this.currentMusic = this.music[trackName];
            this.currentMusic.play().catch(e => console.log('Music play failed:', e));
        }
    }
    
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
            this.currentMusic = null;
        }
    }
    
    playSound(soundName) {
        if (!this.soundEnabled || !this.sounds[soundName]) return;
        
        const sound = this.sounds[soundName].cloneNode();
        sound.volume = this.soundVolume;
        sound.play().catch(e => console.log('Sound play failed:', e));
    }
    
    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
        localStorage.setItem('soundEnabled', enabled);
        
        if (!enabled) {
            this.stopMusic();
        }
    }
    
    setMusicVolume(volume) {
        this.musicVolume = volume;
        localStorage.setItem('musicVolume', volume);
        
        Object.values(this.music).forEach(audio => {
            audio.volume = volume;
        });
    }
    
    setSoundVolume(volume) {
        this.soundVolume = volume;
        localStorage.setItem('soundVolume', volume);
        
        Object.values(this.sounds).forEach(audio => {
            audio.volume = volume;
        });
    }
    
    getSoundEnabled() {
        return this.soundEnabled;
    }
    
    getMusicVolume() {
        return this.musicVolume;
    }
    
    getSoundVolume() {
        return this.soundVolume;
    }
}

// Глобальный экземпляр аудио-менеджера
const audioManager = new AudioManager();
