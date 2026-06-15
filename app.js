/**
 * Whack-A-Mole - Game Script (Garden Theme with transparent assets)
 */

// --- SOUND MANAGER (Web Audio API Synthesizer) ---
class SoundManager {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    playNormalHit() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        // Squeaky cartoon hit sound
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08); // Quick slide up
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.16);  // Then down
        
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.16);
    }

    playGoldHit() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        // Sparkly high-pitched double chime
        const playChime = (delay, freq) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + delay);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.6, now + delay + 0.18);
            
            gain.gain.setValueAtTime(0.12, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.22);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now + delay);
            osc.stop(now + delay + 0.22);
        };

        playChime(0, 700);
        playChime(0.07, 1100);
    }

    playBombHit() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        // Cartoonish comical explosion/crack
        const osc = this.ctx.createOscillator();
        const noise = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(30, now + 0.4);
        
        noise.type = 'sawtooth';
        noise.frequency.setValueAtTime(90, now);
        noise.frequency.linearRampToValueAtTime(10, now + 0.4);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.45);
        
        osc.connect(gain);
        noise.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        noise.start(now);
        osc.stop(now + 0.45);
        noise.stop(now + 0.45);
    }

    playMiss() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        // Swoosh / Whiff sound
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.14);
        
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.14);
    }

    playLevelUp() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        // Cute major scale arpeggio
        const notes = [293.66, 329.63, 392.00, 440.00, 523.25]; // D4, E4, G4, A4, C5
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.07);
            
            gain.gain.setValueAtTime(0.08, now + idx * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.07 + 0.15);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now + idx * 0.07);
            osc.stop(now + idx * 0.07 + 0.15);
        });
    }

    playGameOver() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        // Descending sad melody
        const notes = [392.00, 349.23, 311.13, 261.63, 196.00]; // G4, F4, Eb4, C4, G3
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.15);
            
            gain.gain.setValueAtTime(0.08, now + idx * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.15 + 0.22);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now + idx * 0.15);
            osc.stop(now + idx * 0.15 + 0.22);
        });
    }

    playClick() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.setValueAtTime(1100, now + 0.015);
        
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.035);
    }
}

const sounds = new SoundManager();

// --- IMAGE BACKGROUND PRE-PROCESSOR (Chroma Key) ---
const ASSETS = {
    mole: 'assets/mole.png',
    bomb: 'assets/bomb.png',
    moleTransparent: '',
    bombTransparent: ''
};

/**
 * Removes background color from an image using HTML5 Canvas.
 * Detects key color at top-left corner and clears matching pixels.
 */
function removeBackgroundColor(imageSrc, callback, tolerance = 45, isBomb = false) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Remove watermark text for bomb image (clears bottom 12%)
        if (isBomb) {
            ctx.clearRect(0, canvas.height * 0.88, canvas.width, canvas.height * 0.12);
        }
        
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        
        // Sample background key color at top-left corner (0,0)
        const keyR = data[0];
        const keyG = data[1];
        const keyB = data[2];
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];
            const a = data[i+3];
            
            if (a === 0) continue; // Skip already transparent
            
            // Calculate distance in RGB space
            const dist = Math.sqrt(
                Math.pow(r - keyR, 2) +
                Math.pow(g - keyG, 2) +
                Math.pow(b - keyB, 2)
            );
            
            if (dist < tolerance) {
                data[i+3] = 0; // Set alpha to 0
            }
        }
        
        ctx.putImageData(imgData, 0, 0);
        callback(canvas.toDataURL());
    };
    img.src = imageSrc;
}

// Pre-process images immediately on load
removeBackgroundColor(ASSETS.mole, (dataUrl) => {
    ASSETS.moleTransparent = dataUrl;
}, 75, false);

removeBackgroundColor(ASSETS.bomb, (dataUrl) => {
    ASSETS.bombTransparent = dataUrl;
}, 25, true);

// --- GAME STATE ---
const STATE = {
    mode: 'time', // 'time' or 'survival'
    score: 0,
    combo: 0,
    maxCombo: 0,
    level: 1,
    timeLeft: 60,
    lives: 3,
    highScores: {
        time: 0,
        survival: 0
    },
    isPlaying: false,
    isPaused: false,
    activeMoles: new Set(),
    spawnTimer: null,
    clockTimer: null,
    levelTimer: null,
    // Game balance parameters
    baseSpawnInterval: 1200,
    baseShowDuration: 1100,
    minSpawnInterval: 450,
    minShowDuration: 400,
    speedFactor: 0.92,
    maxActiveMoles: 1
};

// --- DOM ELEMENTS ---
const startScreen = document.getElementById('start-screen');
const playScreen = document.getElementById('play-screen');
const gameoverScreen = document.getElementById('gameover-screen');
const pauseOverlay = document.getElementById('pause-overlay');

const btnModeTime = document.getElementById('btn-mode-time');
const btnModeSurvival = document.getElementById('btn-mode-survival');
const startBtn = document.getElementById('start-btn');
const toggleSoundBtn = document.getElementById('toggle-sound');
const retryBtn = document.getElementById('retry-btn');
const homeBtn = document.getElementById('home-btn');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');

const scoreVal = document.getElementById('score-val');
const comboVal = document.getElementById('combo-val');
const timerVal = document.getElementById('timer-val');
const livesVal = document.getElementById('lives-val');
const levelDisplay = document.getElementById('level-display');
const multiplierDisplay = document.getElementById('multiplier-display');

const timerBox = document.getElementById('timer-box');
const livesBox = document.getElementById('lives-box');
const comboContainer = document.getElementById('combo-container');

const finalScore = document.getElementById('final-score');
const finalCombo = document.getElementById('final-combo');
const finalLevel = document.getElementById('final-level');
const finalModeName = document.getElementById('final-mode-name');
const highScoreVal = document.getElementById('high-score-val');

const gameBoard = document.getElementById('game-board');
const holes = document.querySelectorAll('.hole');
const customCursor = document.getElementById('custom-cursor');

// Load scores
function loadHighScores() {
    const saved = localStorage.getItem('garden_whack_highscores');
    if (saved) {
        try {
            STATE.highScores = JSON.parse(saved);
        } catch (e) {
            console.error(e);
        }
    }
}

// Save score
function saveHighScore(mode, score) {
    if (score > STATE.highScores[mode]) {
        STATE.highScores[mode] = score;
        localStorage.setItem('garden_whack_highscores', JSON.stringify(STATE.highScores));
        return true;
    }
    return false;
}

// --- CURSOR INTERACTION ---
document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});

document.addEventListener('mousedown', () => {
    customCursor.classList.add('hit');
});

document.addEventListener('mouseup', () => {
    customCursor.classList.remove('hit');
});

// Sound Toggle
toggleSoundBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isMuted = sounds.toggleMute();
    toggleSoundBtn.innerHTML = isMuted ? '<span class="icon">🔇</span> 사운드 꺼짐' : '<span class="icon">🔊</span> 사운드 켜짐';
    sounds.playClick();
});

// Mode Selector
btnModeTime.addEventListener('click', (e) => {
    e.stopPropagation();
    sounds.playClick();
    btnModeTime.classList.add('active');
    btnModeSurvival.classList.remove('active');
    STATE.mode = 'time';
});

btnModeSurvival.addEventListener('click', (e) => {
    e.stopPropagation();
    sounds.playClick();
    btnModeSurvival.classList.add('active');
    btnModeTime.classList.remove('active');
    STATE.mode = 'survival';
});

// Start button
startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sounds.playClick();
    startGame();
});

// Retry button
retryBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sounds.playClick();
    startGame();
});

// Home button
homeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sounds.playClick();
    showScreen(startScreen);
});

// Pause button
pauseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sounds.playClick();
    pauseGame();
});

// Resume button
resumeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sounds.playClick();
    resumeGame();
});

// Empty Hole Click (Miss penalty)
gameBoard.addEventListener('mousedown', (e) => {
    if (!STATE.isPlaying || STATE.isPaused) return;
    
    // Check if clicked element or parent is a mole
    if (e.target.classList.contains('mole') || e.target.closest('.mole')) {
        return;
    }
    
    sounds.playMiss();
    resetCombo();
});

// --- HELPER FUNCTIONS ---
function showScreen(screen) {
    [startScreen, playScreen, gameoverScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function getComboMultiplier() {
    return 1 + Math.floor(STATE.combo / 5) * 0.5;
}

function updateMultiplierUI() {
    const mult = getComboMultiplier();
    multiplierDisplay.textContent = `SCORE MULTIPLIER: x${mult.toFixed(1)}`;
    if (mult > 1) {
        multiplierDisplay.classList.add('text-orange');
    } else {
        multiplierDisplay.classList.remove('text-orange');
    }
}

function resetCombo() {
    STATE.combo = 0;
    comboVal.textContent = STATE.combo;
    comboVal.classList.remove('level-pulse');
    updateMultiplierUI();
}

function flashRed() {
    playScreen.classList.add('screen-flash-red');
    playScreen.classList.add('shake');
    setTimeout(() => {
        playScreen.classList.remove('screen-flash-red');
        playScreen.classList.remove('shake');
    }, 400);
}

// --- PARTICLE / TEXT EFFECT GENERATION ---
function createParticles(x, y, color) {
    const numParticles = 12;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.backgroundColor = color;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        if (color === '#4caf50' || color === '#81c784') {
            particle.style.borderRadius = '50% 0 50% 0'; // leaf shape
        }

        const angle = Math.random() * Math.PI * 2;
        const velocity = 25 + Math.random() * 55;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;

        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
    }
}

function createFloatingText(x, y, text, color) {
    const floatText = document.createElement('div');
    floatText.classList.add('floating-text');
    floatText.style.left = `${x}px`;
    floatText.style.top = `${y}px`;
    floatText.style.color = color;
    floatText.innerHTML = text;

    document.body.appendChild(floatText);
    setTimeout(() => floatText.remove(), 800);
}

// --- GAME CONTROL ---
function startGame() {
    loadHighScores();
    STATE.score = 0;
    STATE.combo = 0;
    STATE.maxCombo = 0;
    STATE.level = 1;
    STATE.isPlaying = true;
    STATE.isPaused = false;
    STATE.activeMoles.clear();

    holes.forEach(hole => {
        hole.querySelector('.mole-container').innerHTML = '';
        hole.classList.remove('active-hole');
    });

    if (STATE.mode === 'time') {
        STATE.timeLeft = 60;
        timerVal.textContent = '60s';
        timerBox.classList.remove('hidden');
        livesBox.classList.add('hidden');
    } else {
        STATE.lives = 3;
        updateLivesUI();
        timerBox.classList.add('hidden');
        livesBox.classList.remove('hidden');
    }

    scoreVal.textContent = '00000';
    comboVal.textContent = '0';
    levelDisplay.textContent = 'LV.1';
    levelDisplay.className = 'level-badge';
    updateMultiplierUI();

    showScreen(playScreen);
    startTimers();
}

function startTimers() {
    STATE.clockTimer = setInterval(() => {
        if (STATE.isPaused) return;

        if (STATE.mode === 'time') {
            STATE.timeLeft--;
            timerVal.textContent = `${STATE.timeLeft}s`;
            
            if (STATE.timeLeft <= 0) {
                endGame();
            } else if (STATE.timeLeft <= 10) {
                timerVal.classList.add('text-orange');
            } else {
                timerVal.classList.remove('text-orange');
            }

            if (STATE.timeLeft > 0 && STATE.timeLeft % 10 === 0) {
                levelUp();
            }
        }
    }, 1000);

    if (STATE.mode === 'survival') {
        STATE.levelTimer = setInterval(() => {
            if (STATE.isPaused) return;
            levelUp();
        }, 15000);
    }

    triggerSpawnTick();
}

function triggerSpawnTick() {
    if (!STATE.isPlaying || STATE.isPaused) return;

    const levelModifier = Math.pow(STATE.speedFactor, STATE.level - 1);
    const spawnInterval = Math.max(STATE.baseSpawnInterval * levelModifier, STATE.minSpawnInterval);

    STATE.spawnTimer = setTimeout(() => {
        if (!STATE.isPlaying || STATE.isPaused) return;
        
        if (STATE.activeMoles.size < STATE.maxActiveMoles) {
            spawnMole();
        }

        triggerSpawnTick();
    }, spawnInterval);
}

function levelUp() {
    STATE.level++;
    sounds.playLevelUp();

    levelDisplay.textContent = `LV.${STATE.level}`;
    levelDisplay.classList.add('level-pulse');
    setTimeout(() => levelDisplay.classList.remove('level-pulse'), 600);

    if (STATE.level <= 2) {
        STATE.maxActiveMoles = 1;
    } else if (STATE.level <= 5) {
        STATE.maxActiveMoles = 2;
    } else {
        STATE.maxActiveMoles = 3;
    }
}

function updateLivesUI() {
    let hearts = '';
    for (let i = 0; i < STATE.lives; i++) {
        hearts += '❤️';
    }
    livesVal.textContent = hearts || '💀';
}

// Pause/Resume
function pauseGame() {
    STATE.isPaused = true;
    clearTimeout(STATE.spawnTimer);
    pauseOverlay.classList.add('active');
}

function resumeGame() {
    STATE.isPaused = false;
    pauseOverlay.classList.remove('active');
    triggerSpawnTick();
}

function endGame() {
    STATE.isPlaying = false;
    STATE.isPaused = false;
    
    clearTimeout(STATE.spawnTimer);
    clearInterval(STATE.clockTimer);
    clearInterval(STATE.levelTimer);

    sounds.playGameOver();

    const isNewHigh = saveHighScore(STATE.mode, STATE.score);
    
    finalScore.textContent = STATE.score.toLocaleString();
    finalCombo.textContent = STATE.maxCombo;
    finalLevel.textContent = `LV.${STATE.level}`;
    finalModeName.textContent = STATE.mode === 'time' ? '시간 제한 모드' : '서바이벌 모드';
    
    highScoreVal.textContent = STATE.highScores[STATE.mode].toLocaleString();
    
    if (isNewHigh) {
        highScoreVal.parentElement.classList.add('new-highscore-glow');
        highScoreVal.textContent += ' (NEW RECORD!)';
    } else {
        highScoreVal.parentElement.classList.remove('new-highscore-glow');
    }

    showScreen(gameoverScreen);
}

// --- MOLE SPAWNING AND CLICK HANDLING ---
function spawnMole() {
    const availableHoles = [];
    holes.forEach((hole, idx) => {
        if (!STATE.activeMoles.has(idx)) {
            availableHoles.push(idx);
        }
    });

    if (availableHoles.length === 0) return;

    const holeIdx = availableHoles[Math.floor(Math.random() * availableHoles.length)];
    const hole = holes[holeIdx];
    const container = hole.querySelector('.mole-container');

    STATE.activeMoles.add(holeIdx);
    hole.classList.add('active-hole');

    // Determine type: 80% Normal, 10% Gold, 10% Bomb
    const rand = Math.random();
    let type = 'normal';
    let imageSrc = ASSETS.moleTransparent || ASSETS.mole;
    
    if (rand < 0.1) {
        type = 'gold';
        imageSrc = ASSETS.moleTransparent || ASSETS.mole;
    } else if (rand < 0.2) {
        type = 'bomb';
        imageSrc = ASSETS.bombTransparent || ASSETS.bomb;
    }

    const mole = document.createElement('div');
    mole.classList.add('mole');
    mole.style.backgroundImage = `url('${imageSrc}')`;
    mole.dataset.type = type;
    mole.dataset.hole = holeIdx;
    mole.dataset.whacked = 'false';

    if (type === 'gold') {
        mole.classList.add('gold-mole-filter');
    }

    container.appendChild(mole);

    setTimeout(() => {
        mole.classList.add('up');
    }, 10);

    const levelModifier = Math.pow(STATE.speedFactor, STATE.level - 1);
    let duration = Math.max(STATE.baseShowDuration * levelModifier, STATE.minShowDuration);
    
    if (type === 'gold') {
        duration *= 0.7;
    } else if (type === 'bomb') {
        duration *= 1.25;
    }

    const disappearTimeout = setTimeout(() => {
        if (mole.dataset.whacked === 'false') {
            moleDown(mole, holeIdx, false);
        }
    }, duration);

    // Whack action (Do NOT call stopPropagation so the toy hammer swing triggers naturally)
    mole.addEventListener('mousedown', (e) => {
        if (!STATE.isPlaying || STATE.isPaused || mole.dataset.whacked === 'true') return;

        mole.dataset.whacked = 'true';
        clearTimeout(disappearTimeout);

        const clickX = e.clientX;
        const clickY = e.clientY;

        whackMole(type, clickX, clickY);

        mole.classList.remove('up');
        mole.classList.add('whacked');

        setTimeout(() => {
            mole.remove();
            STATE.activeMoles.delete(holeIdx);
            hole.classList.remove('active-hole');
        }, 300);
    });
}

function moleDown(mole, holeIdx, whacked) {
    mole.classList.remove('up');
    
    if (!whacked) {
        const type = mole.dataset.type;
        if (type !== 'bomb') {
            resetCombo();

            if (STATE.mode === 'survival') {
                STATE.lives--;
                updateLivesUI();
                flashRed();
                if (STATE.lives <= 0) {
                    endGame();
                }
            }
        }
    }

    setTimeout(() => {
        mole.remove();
        STATE.activeMoles.delete(holeIdx);
        holes[holeIdx].classList.remove('active-hole');
    }, 250);
}

function whackMole(type, x, y) {
    if (type === 'normal') {
        sounds.playNormalHit();
        STATE.combo++;
        STATE.maxCombo = Math.max(STATE.maxCombo, STATE.combo);
        
        const mult = getComboMultiplier();
        const points = Math.round(100 * mult);
        STATE.score += points;

        createParticles(x, y, '#4caf50');
        
        const floatText = mult > 1 ? `+${points} <span style="font-size:0.8rem; color:#ff9800;">(x${mult.toFixed(1)})</span>` : `+${points}`;
        createFloatingText(x, y - 20, floatText, '#2e7d32');

    } else if (type === 'gold') {
        sounds.playGoldHit();
        STATE.combo += 2;
        STATE.maxCombo = Math.max(STATE.maxCombo, STATE.combo);

        const mult = getComboMultiplier();
        const points = Math.round(300 * mult);
        STATE.score += points;

        if (STATE.mode === 'time') {
            STATE.timeLeft += 2;
            timerVal.textContent = `${STATE.timeLeft}s`;
            createFloatingText(x + 30, y - 40, '+2s', '#f57f17');
        }

        createParticles(x, y, '#ffc107');
        createFloatingText(x, y - 20, `+${points} <span style="font-size:0.8rem; color:#e65100;">골드 x${mult.toFixed(1)}</span>`, '#f57f17');

    } else if (type === 'bomb') {
        sounds.playBombHit();
        resetCombo();
        flashRed();

        if (STATE.mode === 'time') {
            STATE.score = Math.max(0, STATE.score - 100);
            STATE.timeLeft = Math.max(0, STATE.timeLeft - 5);
            timerVal.textContent = `${STATE.timeLeft}s`;
            createFloatingText(x, y - 20, '-100 PTS', '#c62828');
            createFloatingText(x + 30, y - 40, '-5초', '#c62828');
        } else {
            STATE.score = Math.max(0, STATE.score - 200);
            STATE.lives--;
            updateLivesUI();
            createFloatingText(x, y - 20, '-200 PTS', '#c62828');
            createFloatingText(x + 30, y - 40, '💔', '#c62828');
            if (STATE.lives <= 0) {
                endGame();
            }
        }

        createParticles(x, y, '#5d4037');
    }

    scoreVal.textContent = String(STATE.score).padStart(5, '0');
    comboVal.textContent = STATE.combo;
    
    if (STATE.combo > 0 && STATE.combo % 5 === 0) {
        comboVal.classList.add('level-pulse');
        setTimeout(() => comboVal.classList.remove('level-pulse'), 500);
    }

    updateMultiplierUI();
}

// Load high scores
loadHighScores();
highScoreVal.textContent = STATE.highScores.time.toLocaleString();
