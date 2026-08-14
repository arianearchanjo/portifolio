/* ===================================================================
   ARIANE ARCHANJO — PORTFÓLIO UX
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── HOME INTRO ──
  const introScreen = document.getElementById('introScreen');
  if (introScreen) {
    window.setTimeout(() => introScreen.remove(), 3000);
  }

  // ── PIXEL METER ──
  document.querySelectorAll('.pixel-meter').forEach(el => {
    const level = parseInt(el.dataset.level, 10) || 0;
    const total = 10;
    for (let i = 0; i < total; i++) {
      const span = document.createElement('span');
      if (i < Math.round(level / total)) span.classList.add('filled');
      el.appendChild(span);
    }
  });

  // ── REVEAL ON SCROLL ──
  const revealSelector = '.window, .hero-body, .sobre-grid, .skills-grid, .projects-carousel, .press-feature, .municipal-grid, .timeline-cols, .highlights-grid, .certs-grid, .contact-wrapper';
  const revealEls = document.querySelectorAll(revealSelector);

  function isInView(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - 60 && rect.bottom > 0;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });

  revealEls.forEach(el => {
    if (isInView(el)) {
      el.classList.add('in');
    } else {
      el.classList.add('reveal');
      observer.observe(el);
    }
  });

  // ── LIVE CLOCK ──
  function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent =
      String(now.getHours()).padStart(2, '0') + ':' +
      String(now.getMinutes()).padStart(2, '0');
  }
  updateClock();
  setInterval(updateClock, 30000);

  // ── START MENU ──
  const startBtn = document.getElementById('startBtn');
  const menu = document.createElement('div');
  menu.className = 'start-menu';
  menu.id = 'startMenu';
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', 'Menu de navegação rápida');
  menu.innerHTML = `
    <a class="start-menu-item" role="menuitem" href="index.html"><i class="fas fa-house" aria-hidden="true"></i> Início</a>
    <a class="start-menu-item" role="menuitem" href="setor-publico.html"><i class="fas fa-landmark" aria-hidden="true"></i> Setor público</a>
    <a class="start-menu-item" role="menuitem" href="projetos.html"><i class="fas fa-folder-open" aria-hidden="true"></i> Projetos</a>
    <a class="start-menu-item" role="menuitem" href="perfil.html"><i class="fas fa-user" aria-hidden="true"></i> Perfil &amp; trajetória</a>
    <div class="start-menu-sep" role="separator"></div>
    <a class="start-menu-item" role="menuitem" href="index.html#contato"><i class="fas fa-envelope" aria-hidden="true"></i> Contato</a>
  `;
  document.body.appendChild(menu);

  const menuItems = Array.from(menu.querySelectorAll('.start-menu-item'));

  function openMenu() {
    closeA11yPanel();
    menu.classList.add('open');
    startBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu({ returnFocus = false } = {}) {
    menu.classList.remove('open');
    startBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) startBtn.focus();
  }

  startBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
      menuItems[0]?.focus();
    }
  });

  document.addEventListener('click', () => closeMenu());

  menu.addEventListener('click', e => e.stopPropagation());

  menu.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMenu({ returnFocus: true });
    }
  });

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.target;
      if (target) {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }
      closeMenu();
    });
  });

  // ── PAINEL DE ACESSIBILIDADE ──
  const a11yBtn = document.getElementById('a11yBtn');
  const a11yPanel = document.createElement('div');
  a11yPanel.className = 'a11y-panel';
  a11yPanel.id = 'a11yPanel';
  a11yPanel.setAttribute('role', 'dialog');
  a11yPanel.setAttribute('aria-label', 'Opções de acessibilidade');
  a11yPanel.innerHTML = `
    <h3><i class="fas fa-universal-access" aria-hidden="true"></i> Acessibilidade</h3>

    <div class="a11y-group">
      <span class="a11y-group-label" id="a11yFontLabel">Tamanho do texto</span>
      <div class="a11y-font-row" role="group" aria-labelledby="a11yFontLabel">
        <button type="button" data-font="md" aria-pressed="true">A</button>
        <button type="button" data-font="lg" aria-pressed="false">A+</button>
        <button type="button" data-font="xl" aria-pressed="false">A++</button>
      </div>
    </div>

    <div class="a11y-group">
      <button type="button" class="a11y-toggle" id="a11yContrastToggle" aria-pressed="false">
        <span>Alto contraste</span>
        <span class="switch" aria-hidden="true"></span>
      </button>
      <button type="button" class="a11y-toggle" id="a11yMotionToggle" aria-pressed="false">
        <span>Reduzir movimento</span>
        <span class="switch" aria-hidden="true"></span>
      </button>
    </div>

    <div class="a11y-group">
      <button type="button" class="a11y-toggle" id="a11yReaderToggle" aria-pressed="false">
        <span><i class="fas fa-volume-up" aria-hidden="true"></i> Leitura em voz alta</span>
        <span class="switch" aria-hidden="true"></span>
      </button>
    </div>

    <button type="button" class="a11y-reset" id="a11yReset">Redefinir tudo</button>
  `;
  document.body.appendChild(a11yPanel);

  const html = document.documentElement;
  const fontButtons = Array.from(a11yPanel.querySelectorAll('.a11y-font-row button'));
  const contrastToggle = a11yPanel.querySelector('#a11yContrastToggle');
  const motionToggle = a11yPanel.querySelector('#a11yMotionToggle');
  const resetBtn = a11yPanel.querySelector('#a11yReset');

  function loadA11yPrefs() {
    let fontSize = 'md';
    let contrast = false;
    let motion = false;
    try {
      fontSize = localStorage.getItem('a11yFontSize') || 'md';
      contrast = localStorage.getItem('a11yContrast') === 'true';
      motion = localStorage.getItem('a11yReduceMotion') === 'true';
    } catch (err) { /* localStorage indisponível: segue com padrões */ }
    applyFontSize(fontSize);
    applyContrast(contrast);
    applyMotion(motion);
  }

  function applyFontSize(size) {
    html.classList.remove('a11y-font-lg', 'a11y-font-xl');
    if (size === 'lg') html.classList.add('a11y-font-lg');
    if (size === 'xl') html.classList.add('a11y-font-xl');
    fontButtons.forEach(btn => btn.setAttribute('aria-pressed', btn.dataset.font === size ? 'true' : 'false'));
    try { localStorage.setItem('a11yFontSize', size); } catch (err) { /* ignora */ }
  }

  function applyContrast(on) {
    html.classList.toggle('a11y-contrast', on);
    contrastToggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    try { localStorage.setItem('a11yContrast', on); } catch (err) { /* ignora */ }
  }

  function applyMotion(on) {
    html.classList.toggle('a11y-reduce-motion', on);
    motionToggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    try { localStorage.setItem('a11yReduceMotion', on); } catch (err) { /* ignora */ }
  }

  fontButtons.forEach(btn => {
    btn.addEventListener('click', () => applyFontSize(btn.dataset.font));
  });

  contrastToggle.addEventListener('click', () => {
    applyContrast(!html.classList.contains('a11y-contrast'));
  });

  motionToggle.addEventListener('click', () => {
    applyMotion(!html.classList.contains('a11y-reduce-motion'));
  });

  // ── LEITURA EM VOZ ALTA ──
  const readerToggle = a11yPanel.querySelector('#a11yReaderToggle');
  let speaking = false;
  let utterance = null;

  function stopReading() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    speaking = false;
    utterance = null;
    readerToggle.setAttribute('aria-pressed', 'false');
  }

  function startReading() {
    if (!('speechSynthesis' in window)) return;
    stopReading();

    const main = document.querySelector('main') || document.body;
    const text = main.textContent
      .replace(/\s+/g, ' ')
      .replace(/\(abre em nova aba\)/gi, '')
      .trim();

    if (!text) return;

    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.1;
    utterance.pitch = 1;

    utterance.onend = () => stopReading();
    utterance.onerror = () => stopReading();

    speechSynthesis.speak(utterance);
    speaking = true;
    readerToggle.setAttribute('aria-pressed', 'true');
  }

  readerToggle.addEventListener('click', () => {
    if (speaking || speechSynthesis.speaking) {
      stopReading();
    } else {
      startReading();
    }
  });

  resetBtn.addEventListener('click', () => {
    applyFontSize('md');
    applyContrast(false);
    applyMotion(false);
    stopReading();
  });

  loadA11yPrefs();

  function openA11yPanel() {
    closeMenu();
    a11yPanel.classList.add('open');
    a11yBtn.setAttribute('aria-expanded', 'true');
  }

  function closeA11yPanel({ returnFocus = false } = {}) {
    a11yPanel.classList.remove('open');
    a11yBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) a11yBtn.focus();
  }

  a11yBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (a11yPanel.classList.contains('open')) {
      closeA11yPanel();
    } else {
      openA11yPanel();
      fontButtons[0]?.focus();
    }
  });

  document.addEventListener('click', () => closeA11yPanel());

  a11yPanel.addEventListener('click', e => e.stopPropagation());

  a11yPanel.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeA11yPanel({ returnFocus: true });
    }
  });

  // ── SCROLL TO TOP ──
  const topBtn = document.createElement('button');
  topBtn.className = 'scroll-top-btn';
  topBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  topBtn.setAttribute('aria-label', 'Voltar ao topo');
  document.body.appendChild(topBtn);

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('visible', window.scrollY > 400);
  });

  // ── PROJECTS CAROUSEL ──
  const track = document.getElementById('projectsTrack');
  const dotsContainer = document.getElementById('projectsDots');
  const prevBtn = document.getElementById('projectsPrev');
  const nextBtn = document.getElementById('projectsNext');

  if (track && dotsContainer) {
    const realSlides = Array.from(track.children);
    const origCount = realSlides.length;
    const carousel = document.querySelector('.projects-carousel');
    let itemsPerView = 1;
    let pos = 0;
    let realPage = 0;

    function getItemsPerView() {
      const w = window.innerWidth;
      if (w >= 1000) return Math.min(2, origCount);
      if (w >= 700) return Math.min(2, origCount);
      return 1;
    }

    function getPageCount() {
      return Math.max(1, Math.ceil(origCount / itemsPerView));
    }

    function setupClones() {
      const prefix = realSlides.slice(-itemsPerView).map(s => s.cloneNode(true));
      const suffix = realSlides.slice(0, itemsPerView).map(s => s.cloneNode(true));
      track.innerHTML = '';
      prefix.forEach(s => track.appendChild(s));
      realSlides.forEach(s => track.appendChild(s));
      suffix.forEach(s => track.appendChild(s));
    }

    function renderDots() {
      dotsContainer.innerHTML = '';
      const pageCount = getPageCount();
      for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Ir para os projetos ${i + 1} de ${pageCount}`);
        dot.addEventListener('click', () => { goToPage(i); resetAutoplay(); });
        dotsContainer.appendChild(dot);
      }
    }

    function jumpTo(newPos, newPage) {
      track.style.transition = 'none';
      pos = newPos;
      realPage = newPage;
      const pct = 100 / itemsPerView;
      track.style.setProperty('--slide-pct', `${pct}%`);
      track.style.transform = `translateX(-${pos * pct}%)`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        track.style.transition = '';
      }));
    }

    function updateCarousel() {
      const pct = 100 / itemsPerView;
      track.style.setProperty('--slide-pct', `${pct}%`);
      track.style.transform = `translateX(-${pos * pct}%)`;

      if (prevBtn) prevBtn.disabled = false;
      if (nextBtn) nextBtn.disabled = false;

      const dots = Array.from(dotsContainer.children);
      dots.forEach((dot, i) => {
        const isActive = i === realPage;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      const allSlides = Array.from(track.children);
      allSlides.forEach((slide, i) => {
        const isVisible = i >= pos && i < pos + itemsPerView;
        slide.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
        slide.querySelectorAll('a, button').forEach(el => {
          el.tabIndex = isVisible ? 0 : -1;
        });
      });
    }

    function goToPage(pageIndex) {
      const pageCount = getPageCount();
      const clamped = (pageIndex + pageCount) % pageCount;
      realPage = clamped;
      pos = itemsPerView + clamped * itemsPerView;
      updateCarousel();
    }

    function goPrev() {
      const pageCount = getPageCount();
      realPage = (realPage - 1 + pageCount) % pageCount;
      pos -= itemsPerView;
      updateCarousel();
    }

    function goNext() {
      const pageCount = getPageCount();
      realPage = (realPage + 1) % pageCount;
      pos += itemsPerView;
      updateCarousel();
    }

    function handleResize() {
      const newItemsPerView = getItemsPerView();
      if (newItemsPerView !== itemsPerView) {
        itemsPerView = newItemsPerView;
        track.innerHTML = '';
        realSlides.forEach(s => track.appendChild(s));
        setupClones();
        pos = itemsPerView;
        realPage = 0;
        renderDots();
      }
      updateCarousel();
    }

    itemsPerView = getItemsPerView();
    setupClones();
    pos = itemsPerView;
    renderDots();
    updateCarousel();

    track.addEventListener('transitionend', () => {
      const total = origCount + 2 * itemsPerView;
      const maxPos = total - itemsPerView;
      if (pos <= 0) {
        jumpTo(itemsPerView * (getPageCount() - 1) + itemsPerView, getPageCount() - 1);
      } else if (pos >= maxPos) {
        jumpTo(itemsPerView, 0);
      }
    });

    prevBtn?.addEventListener('click', () => { goPrev(); resetAutoplay(); });
    nextBtn?.addEventListener('click', () => { goNext(); resetAutoplay(); });

    carousel?.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); resetAutoplay(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); resetAutoplay(); }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    });

    // ── swipe (mobile) ──
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      const SWIPE_THRESHOLD = 40;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        diff > 0 ? goNext() : goPrev();
        resetAutoplay();
      }
    }, { passive: true });

    // ── autoplay ──
    let autoplayTimer;
    const AUTOPLAY_DELAY = 4000;

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => goNext(), AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
      clearInterval(autoplayTimer);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    const carouselEl = carousel || track;
    carouselEl.addEventListener('mouseenter', stopAutoplay);
    carouselEl.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  // ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
