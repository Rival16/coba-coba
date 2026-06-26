// ==============================
// PAPER FLY LOTTIE LOADER
// ==============================
const paperFlyData = {"v":"4.8.0","meta":{"g":"LottieFiles AE 3.1.1","a":"","k":"","d":"","tc":""},"fr":30,"ip":0,"op":331,"w":600,"h":600,"nm":"Paperfly","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"plane","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":120,"s":[300,300,0],"to":[0,-2.698,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":150,"s":[300,283.813,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":180,"s":[300,300,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":210,"s":[300,283.813,0],"to":[0,0,0],"ti":[0,-2.698,0]},{"t":240,"s":[300,300,0]}],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[12.5,5.5],[56,-5.5],[57,20],[-17.707,5.565],[11,-16],[31,-1],[43,34],[-24.5,22],[-2.5,-3],[8.5,-9.5],[-15,-11.5],[-4.5,0],[-13,27],[4,8],[27.5,-7.5],[-1.5,-8.5],[-11.5,-14],[3.5,-8],[-6,-1.5],[-3,11],[-14,-20],[16,-8],[9.5,-20],[-17.477,12.562],[14,2],[18,-7.5],[11,1.5]],"o":[[-12.5,-5.5],[-56,5.5],[-57,-20],[17.5,-5.5],[-11,16],[-31,1],[-43,-34],[24.5,-22],[2.5,3],[-8.5,9.5],[15,11.5],[4.5,0],[13,-27],[-4,-8],[-27.5,7.5],[1.5,8.5],[14.702,17.898],[-3.5,8],[6,1.5],[3,-11],[14,20],[-16,8],[-9.5,20],[16,-11.5],[-14,-2],[-18,7.5],[-11,-1.5]],"v":[[334,170.5],[229,153],[91.5,143],[56,64.5],[73,91.5],[-6,115],[-119.5,78],[-142,-28],[-27,-92.5],[-122.5,-23.5],[-126,11],[-75,45.5],[-49,-3],[-9,-102.5],[-120,-83],[-233,-40.5],[-189.5,-14.5],[-190,25.5],[-187,42],[-174.5,21.5],[-139.5,17],[-169,61],[-244.5,110],[-213.5,135.5],[-221,102.5],[-280,125],[-334,128.5]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.969,0.627,0.722,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":240,"s":[0]},{"t":330,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[0]},{"t":120,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":331,"st":0,"bm":0}],"markers":[]};

// ==============================
// LOADING SCREEN
// ==============================
function initLoader() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  const lottieContainer = document.getElementById('lottie-container');
  if (lottieContainer && window.lottie) {
    const anim = lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: paperFlyData
    });
  }

  // Hide loading after 2.8s
  setTimeout(() => {
    if (screen) {
      screen.classList.add('hidden');
      tryPlayMusic();
    }
  }, 2800);
}

// ==============================
// MUSIC PLAYER
// ==============================
let audio = null;
let isPlaying = false;

function tryPlayMusic() {
  audio = document.getElementById('bg-music');
  if (!audio) return;
  audio.volume = 0.35;
  audio.loop = true;
  audio.play().then(() => {
    isPlaying = true;
    updateMusicBtn();
  }).catch(() => {
    // Autoplay blocked, user must click
  });
}

function updateMusicBtn() {
  const btn = document.getElementById('music-btn');
  if (!btn) return;
  const icon = btn.querySelector('.material-icons-round');
  if (icon) icon.textContent = isPlaying ? 'music_note' : 'music_off';
}

function toggleMusic() {
  audio = audio || document.getElementById('bg-music');
  if (!audio) return;
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play();
    isPlaying = true;
  }
  updateMusicBtn();
}

// ==============================
// MOBILE NAV
// ==============================
function initMobileNav() {
  const ham = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (!ham || !mobileNav) return;
  ham.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!ham.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
    }
  });
}

// ==============================
// TOAST NOTIFICATION
// ==============================
function showToast(msg, icon = 'favorite') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<span class="material-icons-round">${icon}</span> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ==============================
// MODAL
// ==============================
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ==============================
// ACTIVE NAV LINK
// ==============================
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.navbar-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && path.endsWith(href)) {
      a.classList.add('active');
    }
  });
}

// ==============================
// INTERSECTION OBSERVER (fade-in)
// ==============================
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.style.opacity = 1);
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => {
    el.style.animationPlayState = 'paused';
    obs.observe(el);
  });
}

// ==============================
// LOCAL STORAGE HELPERS
// ==============================
function getStorage(key, fallback = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch { return fallback; }
}

function setStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ==============================
// INIT
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initMobileNav();
  setActiveNav();
  initFadeIn();

  const musicBtn = document.getElementById('music-btn');
  if (musicBtn) musicBtn.addEventListener('click', toggleMusic);
});