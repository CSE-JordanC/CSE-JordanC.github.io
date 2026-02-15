/* NAV TOGGLE */
var menuToggle = document.getElementById("menuToggle");
var navList = document.getElementById("navList");
var menuArrow = document.getElementById("menuArrow");

function isSmallScreen() {
    return window.matchMedia("(max-width:720px)").matches;
}

if (menuToggle) {
    menuToggle.onclick = function () {
        if (navList.classList.contains("open")) {
            navList.classList.remove("open");
            menuArrow.classList.remove("up");
            menuToggle.setAttribute("aria-expanded", "false");
        } else {
            navList.classList.add("open");
            menuArrow.classList.add("up");
            menuToggle.setAttribute("aria-expanded", "true");
        }
    };
}

window.onresize = function () {
    if (!isSmallScreen()) {
        navList.classList.remove("open");
        menuArrow.classList.remove("up");
        menuToggle.setAttribute("aria-expanded", "false");
    } else {
        navList.classList.remove("open");
        menuArrow.classList.remove("up");
        menuToggle.setAttribute("aria-expanded", "false");
    }
};

/* EXERCISE SWITCHING */
var ex1Link = document.getElementById("ex1Link");
var ex2Link = document.getElementById("ex2Link");
var ex1Section = document.getElementById("exercise1");
var ex2Section = document.getElementById("exercise2");

if (ex1Link) {
    ex1Link.onclick = function (e) {
        e.preventDefault();
        ex1Section.classList.remove("hidden");
        ex2Section.classList.add("hidden");
        // close menu on small screens
        navList.classList.remove("open");
        menuArrow.classList.remove("up");
        menuToggle.setAttribute("aria-expanded", "false");
    };
}

if (ex2Link) {
    ex2Link.onclick = function (e) {
        e.preventDefault();
        ex2Section.classList.remove("hidden");
        ex1Section.classList.add("hidden");
        // update message immediately
        updateCountdownMessage();
        // close menu on small screens
        navList.classList.remove("open");
        menuArrow.classList.remove("up");
        menuToggle.setAttribute("aria-expanded", "false");
    };
}

/* EXERCISE 1: SLIDER (independent) */
var minutesRange = document.getElementById("minutesRange");
var minutesValue = document.getElementById("minutesValue");
var sliderMessage = document.getElementById("sliderMessage");

function updateSliderUI() {
    var val = Number(minutesRange.value);
    minutesValue.innerHTML = val + (val === 1 ? " minute" : " minutes");

    if (val > 45) {
        sliderMessage.innerHTML = "🥓 Plenty of time — enjoy breakfast!";
    } else if (val > 30) {
        sliderMessage.innerHTML = "🍳 Maybe cook something quick.";
    } else if (val > 15) {
        sliderMessage.innerHTML = "☕ Grab coffee and review notes.";
    } else {
        sliderMessage.innerHTML = "🏃 Hurry! Time to go!";
    }
}

if (minutesRange) {
    minutesRange.oninput = updateSliderUI;
    updateSliderUI();
}

/* EXERCISE 2: COUNTDOWN (uses Date() only) */
/* Compute minutes from now until 8:30 AM today (positive => future, negative => started) */
function minutesUntilClassNow() {
    var now = new Date();
    var classTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        8,
        30,
        0,
        0
    );
    var diffMs = classTime - now;
    var diffMinutes = Math.round(diffMs / 60000);
    return diffMinutes;
}

var countdownMessage = document.getElementById("countdownMessage");

function updateCountdownMessage() {
    var mins = minutesUntilClassNow();
    var absMins = Math.abs(mins);
    var msg = "";

    if (mins > 15) {
        msg = "You have " + mins + " minutes until class. 🌤️ Plenty of time — stretch or review notes.";
    } else if (mins >= 10 && mins <= 15) {
        msg = "About " + mins + " minutes left. 🥪 Grab a snack!";
    } else if (mins >= 5 && mins < 10) {
        msg = "Only " + mins + " minutes. ☕ Finish that coffee and head out.";
    } else if (mins >= 0 && mins < 5) {
        msg = "Hurry! " + mins + (mins === 1 ? " minute" : " minutes") + " left. 🏃 Dash to class.";
    } else if (mins < 0 && mins >= -5) {
        msg = "Class started " + absMins + (absMins === 1 ? " minute" : " minutes") + " ago. 😬 Slip in quietly.";
    } else if (mins < -5 && mins >= -15) {
        msg = "Class started " + absMins + " minutes ago. 😅 You're a bit late — find a seat near the back.";
    } else {
        msg = "Class started " + absMins + " minutes ago. 😭 You missed a lot — check the recording or notes.";
    }

    if (countdownMessage) {
        countdownMessage.innerHTML = msg;
    }
}

updateCountdownMessage();

/* Update every 10 seconds but only refresh text when Exercise 2 is visible */
var countdownInterval = null;

function startCountdownInterval() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    countdownInterval = setInterval(function () {
        if (!ex2Section.classList.contains("hidden")) {
            updateCountdownMessage();
        }
    }, 10000);
}

startCountdownInterval();

