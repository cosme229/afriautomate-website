/* =====================================================================
   AfriAutomate — Script principal (vanilla JS, aucune dépendance)
   =====================================================================
   Modules :
     - initBurger()         : menu mobile ARIA
     - initFAQ()            : accordéon ARIA accessible clavier
     - initSmoothScroll()   : défilement doux avec offset header
     - initRevealOnScroll() : animations d'entrée via IntersectionObserver
     - initHeaderShrink()   : header opaque au scroll
     - initActiveNavLink()  : lien de nav actif selon section visible
     - initCurrentYear()    : injecte l'année courante dans le footer si besoin
   ===================================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------------------
     1. Menu mobile (burger) — toggle aria-expanded
     ------------------------------------------------------------------- */
  function initBurger() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    if (!burger || !nav) return;

    const closeNav = () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
    };
    const openNav = () => {
      nav.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Fermer le menu');
    };

    burger.addEventListener('click', () => {
      const isOpen = nav.classList.contains('is-open');
      isOpen ? closeNav() : openNav();
    });

    // Ferme le menu après clic sur une ancre interne
    nav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    // Ferme avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        burger.focus();
      }
    });
  }


  /* -------------------------------------------------------------------
     2. FAQ — onglets + accordéon (ARIA + clavier accessible)
     ------------------------------------------------------------------- */
  function initFAQ() {
    initFAQTabs();
    initFAQItems();
  }

  // 2.a Onglets de catégories (slide-up animation côté CSS)
  function initFAQTabs() {
    const tabs = document.querySelectorAll('.faq__tab');
    const panels = document.querySelectorAll('.faq__panel');
    if (!tabs.length || !panels.length) return;

    const activate = (tabKey) => {
      tabs.forEach((tab) => {
        const isActive = tab.dataset.tab === tabKey;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });
      panels.forEach((panel) => {
        const isActive = panel.dataset.panel === tabKey;
        if (isActive) {
          panel.hidden = false;
          // Force reflow pour redéclencher l'animation
          panel.classList.remove('is-entering');
          void panel.offsetWidth;
          panel.classList.add('is-entering');
        } else {
          panel.hidden = true;
          panel.classList.remove('is-entering');
        }
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activate(tab.dataset.tab));

      // Navigation clavier ←/→ entre onglets (pattern WAI-ARIA)
      tab.addEventListener('keydown', (e) => {
        const tabsArray = Array.from(tabs);
        const idx = tabsArray.indexOf(tab);
        let next = null;
        if (e.key === 'ArrowRight') next = tabsArray[(idx + 1) % tabsArray.length];
        if (e.key === 'ArrowLeft') next = tabsArray[(idx - 1 + tabsArray.length) % tabsArray.length];
        if (e.key === 'Home') next = tabsArray[0];
        if (e.key === 'End') next = tabsArray[tabsArray.length - 1];
        if (next) {
          e.preventDefault();
          next.focus();
          activate(next.dataset.tab);
        }
      });
    });
  }

  // 2.b Items accordéon (toggle aria-expanded + hidden)
  function initFAQItems() {
    const buttons = document.querySelectorAll('.faq__question');
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const panelId = btn.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (!panel) return;
        btn.setAttribute('aria-expanded', String(!expanded));
        panel.hidden = expanded;
      });
    });
  }


  /* -------------------------------------------------------------------
     3. Défilement doux avec offset header
     ------------------------------------------------------------------- */
  function initSmoothScroll() {
    const header = document.getElementById('header');
    const headerHeight = () => (header ? header.offsetHeight : 0);

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight() - 12;
        window.scrollTo({ top, behavior: 'smooth' });

        // Met à jour l'URL sans recharger ni sauter
        if (history.pushState) history.pushState(null, '', href);
      });
    });
  }


  /* -------------------------------------------------------------------
     4. Animations d'entrée — IntersectionObserver
     ------------------------------------------------------------------- */
  function initRevealOnScroll() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    // Fallback si IntersectionObserver indisponible
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    items.forEach((el) => observer.observe(el));
  }


  /* -------------------------------------------------------------------
     5. Header — état "scrolled" pour fond plus opaque
     ------------------------------------------------------------------- */
  function initHeaderShrink() {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 40) {
            header.classList.add('header--scrolled');
          } else {
            header.classList.remove('header--scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* -------------------------------------------------------------------
     6 bis. Animations dédiées section "Pourquoi AfriAutomate"
     Déclenche `.is-animated` quand la section entre dans le viewport,
     ce qui active la cascade : trait doré → titre → lead → 5 features
     stagger → CTA. Cf. style.css bloc "11 bis".
     ------------------------------------------------------------------- */
  function initWhyAnimations() {
    const why = document.querySelector('.why--light');
    if (!why) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback navigateur ancien : on affiche tout direct
      why.classList.add('is-animated');
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            why.classList.add('is-animated');
            obs.unobserve(why);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -80px 0px' }
    );
    observer.observe(why);
  }


  /* -------------------------------------------------------------------
     7. Lien de navigation actif (mise en évidence section visible)
     ------------------------------------------------------------------- */
  function initActiveNavLink() {
    const links = document.querySelectorAll('.header__link');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const sections = Array.from(links)
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((l) => {
              if (l.getAttribute('href') === '#' + id) {
                l.classList.add('is-active');
              } else {
                l.classList.remove('is-active');
              }
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => observer.observe(s));
  }


  /* -------------------------------------------------------------------
     7. Initialisation au DOMContentLoaded
     ------------------------------------------------------------------- */
  function init() {
    initBurger();
    initFAQ();
    initSmoothScroll();
    initRevealOnScroll();
    initHeaderShrink();
    initActiveNavLink();
    initWhyAnimations();
    console.info('%cAfriAutomate — site chargé ✓', 'color:#FF8A00;font-weight:bold');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
