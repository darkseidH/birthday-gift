const birthdayConfig = {
  herName: "9emla",
  birthdayDate: "2026-05-13T00:00:00+01:00",
  message: `Happy Birthday, 9emla.

Today is about celebrating you: your heart, your smile, your kindness, and the way you make life feel softer just by being in it.

I hope this little page reminds you that you are loved deeply, appreciated every day, and treasured more than words can fully explain.

May this birthday bring you the same warmth, joy, and beauty that you bring into my life.`
};

const loveReasons = [
  "I love the way your smile changes the whole mood of a day.",
  "I love how soft and kind your heart is.",
  "I love that even simple moments feel special when they are with you.",
  "I love your eyes, your laugh, and the peace you bring me.",
  "I love you because you are you, and that is more than enough."
];

const targetDate = new Date(birthdayConfig.birthdayDate).getTime();
const countdownFields = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};
const surprisePanel = document.querySelector(".surprise-panel");
const stateLabel = document.getElementById("state-label");
const surpriseTitle = document.getElementById("surprise-title");
const surpriseMessage = document.getElementById("surprise-message");
const nameTargets = document.querySelectorAll("[data-her-name]");
const loveStream = document.getElementById("love-stream");
const activeLoveShapes = new Set();
const slideSections = Array.from(document.querySelectorAll(".scroll-section"));
const flipCards = document.querySelectorAll(".flip-card");
const slideDots = document.getElementById("slide-dots");
const secretNote = document.getElementById("secret-note");
const musicToggle = document.getElementById("music-toggle");
const romanticAudio = document.getElementById("romantic-audio");
const unlockActions = document.getElementById("unlock-actions");
const openLetter = document.getElementById("open-letter");
const letterModal = document.getElementById("letter-modal");
const closeLetter = document.getElementById("close-letter");
const letterBody = document.getElementById("letter-body");
const reasonsDeck = document.getElementById("reasons-deck");
const reasonText = document.getElementById("reason-text");
const reasonCount = document.getElementById("reason-count");
const prevReason = document.getElementById("prev-reason");
const nextReason = document.getElementById("next-reason");
let activeSlideIndex = 0;
let isSlideScrolling = false;
let touchStartY = 0;
let secretTimer;
let revealEffectsPlayed = false;
let reasonIndex = 0;
let isMusicPlaying = false;

nameTargets.forEach((target) => {
  target.textContent = birthdayConfig.herName;
  target.tabIndex = 0;
  target.setAttribute("role", "button");
});

letterBody.textContent = birthdayConfig.message;

function formatTime(value) {
  return String(value).padStart(2, "0");
}

function setCountdown(days, hours, minutes, seconds) {
  countdownFields.days.textContent = formatTime(days);
  countdownFields.hours.textContent = formatTime(hours);
  countdownFields.minutes.textContent = formatTime(minutes);
  countdownFields.seconds.textContent = formatTime(seconds);
}

function revealBirthdayMessage() {
  setCountdown(0, 0, 0, 0);
  surprisePanel.classList.add("is-revealed");
  stateLabel.textContent = "Unlocked with all my love";
  surpriseTitle.textContent = `Happy Birthday, ${birthdayConfig.herName}`;
  surpriseMessage.textContent = "Your birthday letter is ready. Open it when you want to read the message I wrote just for you.";
  unlockActions.classList.remove("is-hidden");
  reasonsDeck.classList.remove("is-hidden");
  updateReason();

  if (!revealEffectsPlayed) {
    revealEffectsPlayed = true;
    launchConfetti();
  }
}

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    revealBirthdayMessage();
    clearInterval(countdownTimer);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  setCountdown(days, hours, minutes, seconds);
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createFloatingKiss() {
  const kiss = document.createElement("span");
  const size = randomBetween(22, 38);
  const duration = randomBetween(8.5, 12);
  const drift = randomBetween(-56, 56);

  kiss.className = "floating-love";
  kiss.textContent = "💋";
  kiss.style.setProperty("--x", `${randomBetween(4, 96)}vw`);
  kiss.style.setProperty("--size", `${size}px`);
  kiss.style.setProperty("--duration", `${duration}s`);
  kiss.style.setProperty("--drift", `${drift}px`);

  activeLoveShapes.add(kiss);
  loveStream.appendChild(kiss);

  kiss.addEventListener("animationend", () => {
    activeLoveShapes.delete(kiss);
    kiss.remove();
  }, { once: true });
}

function turnFloatingKissesIntoHearts() {
  activeLoveShapes.forEach((shape) => {
    if (shape.classList.contains("is-heart")) {
      return;
    }

    shape.textContent = "";
    shape.classList.remove("is-kiss");
    shape.classList.add("is-heart");
  });
}

function createBurst(x, y, count = 12) {
  for (let index = 0; index < count; index += 1) {
    const burst = document.createElement("span");
    const angle = randomBetween(0, Math.PI * 2);
    const distance = randomBetween(42, 112);

    burst.className = "burst-kiss";
    burst.textContent = index % 3 === 0 ? "♥" : "💋";
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    burst.style.setProperty("--burst-x", `${Math.cos(angle) * distance}px`);
    burst.style.setProperty("--burst-y", `${Math.sin(angle) * distance}px`);
    burst.style.setProperty("--burst-rotate", `${randomBetween(-80, 80)}deg`);
    document.body.appendChild(burst);
    burst.addEventListener("animationend", () => burst.remove(), { once: true });
  }
}

function launchSecretStorm() {
  for (let index = 0; index < 90; index += 1) {
    const storm = document.createElement("span");
    const startX = randomBetween(0, window.innerWidth);
    const startY = randomBetween(0, window.innerHeight);
    const angle = randomBetween(0, Math.PI * 2);
    const distance = randomBetween(90, 260);

    storm.className = "secret-storm";
    storm.textContent = index % 2 === 0 ? "♥" : "💋";
    storm.style.left = `${startX}px`;
    storm.style.top = `${startY}px`;
    storm.style.setProperty("--storm-size", `${randomBetween(18, 42)}px`);
    storm.style.setProperty("--burst-x", `${Math.cos(angle) * distance}px`);
    storm.style.setProperty("--burst-y", `${Math.sin(angle) * distance}px`);
    storm.style.setProperty("--burst-rotate", `${randomBetween(-220, 220)}deg`);
    document.body.appendChild(storm);
    storm.addEventListener("animationend", () => storm.remove(), { once: true });
  }
}

function launchLetterExplosion() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let index = 0; index < 80; index += 1) {
    const piece = document.createElement("span");
    const angle = randomBetween(0, Math.PI * 2);
    const distance = randomBetween(90, 330);

    piece.className = "secret-storm letter-explosion";
    piece.textContent = index % 2 === 0 ? "♥" : "💋";
    piece.style.left = `${centerX + randomBetween(-36, 36)}px`;
    piece.style.top = `${centerY + randomBetween(-36, 36)}px`;
    piece.style.setProperty("--storm-size", `${randomBetween(20, 46)}px`);
    piece.style.setProperty("--burst-x", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--burst-y", `${Math.sin(angle) * distance}px`);
    piece.style.setProperty("--burst-rotate", `${randomBetween(-260, 260)}deg`);
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function launchConfetti() {
  for (let index = 0; index < 70; index += 1) {
    const piece = document.createElement("span");
    const startX = randomBetween(0, window.innerWidth);
    const colors = ["#b96073", "#8f3c57", "#f3d6ab", "#f8dce4"];

    piece.className = "confetti-piece";
    piece.style.left = `${startX}px`;
    piece.style.top = `${randomBetween(-40, 20)}px`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--burst-x", `${randomBetween(-90, 90)}px`);
    piece.style.setProperty("--burst-y", `${randomBetween(window.innerHeight * 0.5, window.innerHeight * 0.95)}px`);
    piece.style.setProperty("--burst-rotate", `${randomBetween(-240, 240)}deg`);
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function turnHeartIntoKiss(heart) {
  if (heart.classList.contains("is-kiss")) {
    return;
  }

  const bounds = heart.getBoundingClientRect();
  heart.textContent = "💋";
  heart.style.left = `${bounds.left}px`;
  heart.style.top = `${bounds.top}px`;
  heart.style.bottom = "auto";
  heart.style.removeProperty("--duration");
  heart.classList.add("is-kiss");
}

function kissNearbyHearts(x, y) {
  let changed = 0;

  activeLoveShapes.forEach((heart) => {
    const bounds = heart.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const distance = Math.hypot(centerX - x, centerY - y);

    if (distance < 96) {
      changed += 1;
      turnHeartIntoKiss(heart);
    }
  });

  if (changed === 0) {
    const kiss = document.createElement("span");
    kiss.className = "floating-love is-kiss";
    kiss.textContent = "💋";
    kiss.style.setProperty("--size", "22px");
    kiss.style.left = `${x - 12}px`;
    kiss.style.top = `${y - 12}px`;
    activeLoveShapes.add(kiss);
    loveStream.appendChild(kiss);
    kiss.addEventListener("animationend", () => {
      activeLoveShapes.delete(kiss);
      kiss.remove();
    }, { once: true });
  }
}

document.addEventListener("pointerdown", (event) => {
  kissNearbyHearts(event.clientX, event.clientY);
});

flipCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    event.stopPropagation();
    const wasFlipped = card.classList.contains("is-flipped");
    const bounds = card.getBoundingClientRect();

    card.classList.toggle("is-flipped");

    if (wasFlipped) {
      turnFloatingKissesIntoHearts();
    } else {
      createBurst(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
    }
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      const wasFlipped = card.classList.contains("is-flipped");
      const bounds = card.getBoundingClientRect();

      card.classList.toggle("is-flipped");

      if (wasFlipped) {
        turnFloatingKissesIntoHearts();
      } else {
        createBurst(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
      }
    }
  });
});

function showSecretNote() {
  secretNote.classList.add("is-visible");
  launchSecretStorm();
  window.clearTimeout(secretTimer);
  secretTimer = window.setTimeout(() => {
    secretNote.classList.remove("is-visible");
  }, 2800);
}

nameTargets.forEach((target) => {
  target.addEventListener("click", (event) => {
    event.stopPropagation();
    showSecretNote();
  });

  target.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      showSecretNote();
    }
  });
});

function nearestSlideIndex() {
  const viewportMiddle = window.scrollY + window.innerHeight / 2;
  let nearestIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;

  slideSections.forEach((section, index) => {
    const sectionMiddle = section.offsetTop + section.offsetHeight / 2;
    const distance = Math.abs(viewportMiddle - sectionMiddle);

    if (distance < nearestDistance) {
      nearestIndex = index;
      nearestDistance = distance;
    }
  });

  return nearestIndex;
}

function goToSlide(index) {
  const nextIndex = Math.max(0, Math.min(index, slideSections.length - 1));

  if (nextIndex === activeSlideIndex && isSlideScrolling) {
    return;
  }

  activeSlideIndex = nextIndex;
  updateSlideDots();
  isSlideScrolling = true;
  slideSections[activeSlideIndex].scrollIntoView({ behavior: "smooth", block: "start" });

  window.setTimeout(() => {
    isSlideScrolling = false;
  }, 850);
}

function updateSlideDots() {
  const dots = slideDots.querySelectorAll(".slide-dot");

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeSlideIndex);
    dot.setAttribute("aria-current", index === activeSlideIndex ? "true" : "false");
  });
}

slideSections.forEach((section, index) => {
  const dot = document.createElement("button");

  dot.className = "slide-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
  dot.addEventListener("click", (event) => {
    event.stopPropagation();
    goToSlide(index);
  });
  slideDots.appendChild(dot);
});

updateSlideDots();

function moveSlide(direction) {
  if (isSlideScrolling) {
    return;
  }

  activeSlideIndex = nearestSlideIndex();
  turnFloatingKissesIntoHearts();
  goToSlide(activeSlideIndex + direction);
}

document.querySelectorAll(".scroll-cue").forEach((cue) => {
  cue.addEventListener("click", (event) => {
    const targetSelector = cue.getAttribute("href");

    if (!targetSelector) {
      return;
    }

    const target = document.querySelector(targetSelector);
    const targetIndex = slideSections.indexOf(target);

    if (targetIndex === -1) {
      return;
    }

    event.preventDefault();
    goToSlide(targetIndex);
  });
});

window.addEventListener("wheel", (event) => {
  if (Math.abs(event.deltaY) < 8) {
    return;
  }

  event.preventDefault();
  moveSlide(event.deltaY > 0 ? 1 : -1);
}, { passive: false });

window.addEventListener("touchstart", (event) => {
  touchStartY = event.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchmove", (event) => {
  if (letterModal.classList.contains("is-open")) {
    return;
  }

  event.preventDefault();
}, { passive: false });

window.addEventListener("touchend", (event) => {
  const touchEndY = event.changedTouches[0].clientY;
  const swipeDistance = touchStartY - touchEndY;

  if (Math.abs(swipeDistance) > 44) {
    moveSlide(swipeDistance > 0 ? 1 : -1);
  }
}, { passive: true });

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && letterModal.classList.contains("is-open")) {
    letterModal.classList.remove("is-open");
    letterModal.setAttribute("aria-hidden", "true");
    return;
  }

  if (event.target instanceof Element && event.target.closest("button, [role='button']")) {
    return;
  }

  if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
    event.preventDefault();
    moveSlide(1);
  }

  if (event.key === "ArrowUp" || event.key === "PageUp") {
    event.preventDefault();
    moveSlide(-1);
  }
});

window.addEventListener("resize", () => {
  activeSlideIndex = nearestSlideIndex();
  updateSlideDots();
});

function updateReason() {
  reasonText.textContent = loveReasons[reasonIndex];
  reasonCount.textContent = `${reasonIndex + 1} / ${loveReasons.length}`;
}

prevReason.addEventListener("click", (event) => {
  event.stopPropagation();
  reasonIndex = (reasonIndex - 1 + loveReasons.length) % loveReasons.length;
  updateReason();
});

nextReason.addEventListener("click", (event) => {
  event.stopPropagation();
  reasonIndex = (reasonIndex + 1) % loveReasons.length;
  updateReason();
});

openLetter.addEventListener("click", (event) => {
  event.stopPropagation();
  launchLetterExplosion();
  letterModal.classList.add("is-open");
  letterModal.setAttribute("aria-hidden", "false");
});

closeLetter.addEventListener("click", (event) => {
  event.stopPropagation();
  letterModal.classList.remove("is-open");
  letterModal.setAttribute("aria-hidden", "true");
});

letterModal.addEventListener("click", (event) => {
  if (event.target === letterModal) {
    letterModal.classList.remove("is-open");
    letterModal.setAttribute("aria-hidden", "true");
  }
});

function startMusic() {
  romanticAudio.volume = 0.55;
  romanticAudio.play()
    .then(() => {
      isMusicPlaying = true;
      musicToggle.textContent = "Music on";
      musicToggle.setAttribute("aria-pressed", "true");
    })
    .catch(() => {
      musicToggle.textContent = "Tap again";
    });
}

function stopMusic() {
  romanticAudio.pause();
  isMusicPlaying = false;
  musicToggle.textContent = "Music";
  musicToggle.setAttribute("aria-pressed", "false");
}

musicToggle.addEventListener("click", (event) => {
  event.stopPropagation();

  if (isMusicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
});

for (let index = 0; index < 14; index += 1) {
  setTimeout(createFloatingKiss, index * 420);
}

setInterval(createFloatingKiss, 700);
