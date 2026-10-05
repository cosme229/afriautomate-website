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
     - initCostCalculator() : calculateur de coût sur 12 mois (guide des prix)
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

    // Seules les ancres internes (#...) sont observées : sur les autres pages,
    // les liens du header pointent vers "/#services" (sélecteur CSS invalide)
    const sections = Array.from(links)
      .map((link) => link.getAttribute('href'))
      .filter((href) => href && href.startsWith('#') && href.length > 1)
      .map((href) => document.querySelector(href))
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
     8. Calculateur de coût sur 12 mois
     Page : combien-coute-agent-ia-local-benin.html (#aa-calc)
     Compare une offre cloud (frais d'API facturés en $) à l'IA locale
     AfriAutomate (mise en place + abonnement + hébergement, en FCFA).
     Montants des packs : content/packs-offres.md (valeurs du <select>).
     ------------------------------------------------------------------- */
  function initCostCalculator() {
    const calc = document.getElementById('aa-calc');
    if (!calc) return;

    const $ = (id) => document.getElementById(id);
    // Valeur numérique positive d'un champ (0 si vide ou invalide)
    const num = (id) => {
      const v = parseFloat($(id).value);
      return isFinite(v) && v >= 0 ? v : 0;
    };
    // 1234567 → "1 234 567 FCFA" (espaces insécables : pas de retour à la ligne)
    const fmt = (n) =>
      Math.round(n).toLocaleString('fr-FR').replace(/[\u202F\u00A0 ]/g, '\u00A0') + '\u00A0FCFA';

    const pack = $('c-pack');

    // Choix d'un pack → remplit mise en place + abonnement
    const applyPack = () => {
      if (pack.value === 'perso') return;
      const [setup, monthly] = pack.value.split('|');
      $('c-li').value = setup;
      $('c-lm').value = monthly;
    };

    // Saisie manuelle → le sélecteur passe sur « Montants personnalisés »
    const syncPack = () => {
      const current = num('c-li') + '|' + num('c-lm');
      const match = Array.from(pack.options).find((o) => o.value === current);
      pack.value = match ? match.value : 'perso';
    };

    function update() {
      // Prix $ par million de tokens : "entrée|sortie"
      const [pIn, pOut] = $('c-mod').value.split('|').map(parseFloat);
      // Coût API d'une conversation en $ (hypothèse : 80 % des tokens en entrée, 20 % en sortie)
      const usdParConv = (num('c-tok') / 1e6) * (0.8 * pIn + 0.2 * pOut);
      const apiUsd = usdParConv * num('c-conv');          // $ par mois
      const apiF = apiUsd * num('c-usd');                 // FCFA par mois

      const heb = parseFloat($('c-heb').value);
      const cloudFixe = num('c-ci') + 12 * (num('c-cm') + num('c-ch'));   // hors API
      const cloud = cloudFixe + 12 * apiF;
      const local = num('c-li') + 12 * (num('c-lm') + heb);

      $('r-cloud').textContent = fmt(cloud);
      $('r-cloud-api').textContent =
        'dont API : ' + fmt(apiF * 12) + ' sur 12 mois (' + apiUsd.toFixed(2).replace('.', ',') + '\u00A0$/mois)';
      $('r-local').textContent = fmt(local);
      $('r-local-detail').textContent =
        (heb > 0 ? 'dont hébergement : ' + fmt(heb * 12) + ' sur 12 mois' : 'matériel sur site non inclus') +
        ' · coût fixe, indépendant du volume';

      // Seuil de rentabilité : volume mensuel à partir duquel l'IA locale
      // coûte moins cher (les frais d'API cloud augmentent avec le volume)
      const apiAnParConv = 12 * usdParConv * num('c-usd');   // FCFA sur 12 mois pour 1 conversation/mois
      let seuil = '';
      if (apiAnParConv > 0) {
        const n = (local - cloudFixe) / apiAnParConv;
        if (n <= 0) {
          seuil = "Point d'équilibre : avec ces montants, l'IA locale est moins chère quel que soit votre volume.";
        } else {
          const pas = n < 1000 ? 10 : 100;
          const arrondi = (Math.ceil(n / pas) * pas).toLocaleString('fr-FR').replace(/[\u202F\u00A0 ]/g, '\u00A0');
          seuil = "Point d'équilibre : environ " + arrondi +
            " conversations par mois. Au-delà, l'IA locale coûte moins cher.";
        }
      }
      $('r-seuil').textContent = seuil;

      const diff = cloud - local;
      let verdict;
      if (Math.abs(diff) < 0.05 * Math.max(cloud, local)) {
        verdict = 'Les deux options se valent sur 12 mois : la différence se joue sur la conformité et la prévisibilité.';
      } else if (diff > 0) {
        verdict = "Avec ces hypothèses, l'IA locale revient " + fmt(diff) + ' moins cher sur 12 mois.';
      } else {
        verdict = "Avec ces hypothèses, l'offre cloud revient " + fmt(-diff) +
          " moins cher sur 12 mois. L'IA locale se justifie alors par la conformité ou par la croissance du volume.";
      }
      $('r-verdict').textContent = verdict;
    }

    // Délégation : un seul écouteur pour tous les champs du calculateur
    const onEdit = (e) => {
      if (e.target === pack) applyPack();
      else if (e.target.id === 'c-li' || e.target.id === 'c-lm') syncPack();
      update();
    };
    calc.addEventListener('input', onEdit);
    calc.addEventListener('change', onEdit);

    applyPack();
    update();
  }


  /* -------------------------------------------------------------------
     9. Initialisation au DOMContentLoaded
     ------------------------------------------------------------------- */
  function init() {
    initBurger();
    initFAQ();
    initSmoothScroll();
    initRevealOnScroll();
    initHeaderShrink();
    initActiveNavLink();
    initWhyAnimations();
    initCostCalculator();
    console.info('%cAfriAutomate — site chargé ✓', 'color:#FF8A00;font-weight:bold');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
