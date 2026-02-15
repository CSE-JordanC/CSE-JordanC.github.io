/* Menu toggle */
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');
const menuArrow = document.getElementById('menuArrow');

function isSmallScreen() {
    return window.matchMedia('(max-width:720px)').matches;
}

function toggleMenu() {
    if (!isSmallScreen()) {
        return;
    }
    const open = navList.classList.toggle('open');
    menuArrow.classList.toggle('up', open);
    menuToggle.setAttribute('aria-expanded', !!open);
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

window.addEventListener('resize', () => {
    if (!isSmallScreen()) {
        navList.classList.remove('open');
        menuArrow.classList.remove('up');
        menuToggle.setAttribute('aria-expanded', 'false');
    } else {
        navList.classList.remove('open');
        menuArrow.classList.remove('up');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

/* Exercise switching */
const ex1Link = document.getElementById('ex1Link');
const ex2Link = document.getElementById('ex2Link');
const ex1Section = document.getElementById('exercise1');
const ex2Section = document.getElementById('exercise2');

function showExercise(which) {
    if (which === 1) {
        ex1Section.classList.remove('hidden');
        ex2Section.classList.add('hidden');
    } else {
        ex2Section.classList.remove('hidden');
        ex1Section.classList.add('hidden');
    }

    if (isSmallScreen()) {
        navList.classList.remove('open');
        menuArrow.classList.remove('up');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (which === 2) {
        updateCountdownMessage();
    }
}

if (ex1Link) {
    ex1Link.addEventListener('click', (e) => {
        e.preventDefault();
        showExercise(1);
    });
}

if (ex2Link) {
    ex2Link.addEventListener('click', (e) => {
        e.preventDefault();
        showExercise(2);
    });
}

/* Default show exercise 1 */
showExercise(1);

/* Exercise 1 slider logic */
const minutesRange = document.getElementById('minutesRange');
const minutesValue = document.getElementById('minutesValue');
const sliderMessage = document.getElementById('sliderMessage');

function updateSliderUI() {
    const val = Number(minutesRange.value);
    minutesValue.textContent = val + (val === 1 ? ' minute' : ' minutes');

    let msg = '';
    if (val > 45) {
        msg = '🥓 Let\'s have bacon and eggs — you have plenty of time!';
    } else if (val > 30 && val <= 45) {
        msg = '🍳 Perfect for pancakes — plenty of time for a breakfast sprint!';
    } else if (val > 15 && val <= 30) {
        msg = '☕ Grab your coffee. No one will judge if you\'re 5 minutes late.';
    } else {
        msg = '🏃‍♀️ Quick — dash to class! Better run than miss it.';
    }

    sliderMessage.textContent = msg;
}

if (minutesRange) {
    minutesRange.addEventListener('input', updateSliderUI);
    updateSliderUI();
}

/* Exercise 2 countdown logic */
const countdownMessage = document.getElementById('countdownMessage');

function minutesUntilClass() {
    const now = new Date();
    const classTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        8,
        30,
        0,
        0
    );
    const diffMs = classTime - now;
    const diffMinutes = Math.round(diffMs / 60000);
    return diffMinutes;
}

function updateCountdownMessage() {
    const mins = minutesUntilClass();
    let msg = '';
    const absMins = Math.abs(mins);

    if (mins > 15) {
        msg = `You have ${mins} minutes until class. ☀️ Time to relax — maybe stretch or review notes.`;
    } else if (mins > 10 && mins <= 15) {
        msg = `About ${mins} minutes left. 🥪 Maybe snag a quick snack.`;
    } else if (mins > 5 && mins <= 10) {
        msg = `Only ${mins} minutes. ☕ Brew that coffee and get your bag ready.`;
    } else if (mins >= 0 && mins <= 5) {
        msg = `Hurry! ${mins} minute${mins === 1 ? '' : 's'} left. 🏃‍♂️ Run — class is about to start.`;
    } else if (mins < 0 && mins >= -5) {
        msg = `Class started ${absMins} minute${absMins === 1 ? '' : 's'} ago. 😬 You're only a smidge late — slip in quietly.`;
    } else if (mins < -5 && mins >= -15) {
        msg = `Class started ${absMins} minutes ago. 😅 You're fashionably late — catch up on a seat near the back.`;
    } else {
        msg = `You missed class by ${absMins} minutes. 😭 Consider checking the recording or notes.`;
    }

    countdownMessage.textContent = msg;
}

updateCountdownMessage();

let countdownInterval = null;

function startCountdownInterval() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    countdownInterval = setInterval(() => {
        if (!ex2Section.classList.contains('hidden')) {
            updateCountdownMessage();
        }
    }, 10000);
}

startCountdownInterval();

/* accessibility: keyboard activation */
[ex1Link, ex2Link].forEach((el) => {
    if (!el) {
        return;
    }
    el.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            el.click();
        }
    });
});
