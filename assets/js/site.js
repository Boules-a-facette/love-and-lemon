/* Love and Lemon : JavaScript sans dépendance. */

// Destinataires des formulaires (envoi par mailto : rien ne transite par un service tiers).
const CONTACT_TO = 'hello@love-and-lemon.fr';
const DEVIS_TO = 'sweetpaper.fairepart@gmail.com';

(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* En-tête : fond sombre au défilement, menu mobile */
  var header = $('.page-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 0); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    var btn = $('.menu-btn', header);
    btn.addEventListener('click', function () {
      var open = header.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Hero : fondu enchaîné */
  var hero = $('#hero');
  if (hero) {
    var slides = $$('.hero-slide', hero);
    var dotsBox = $('.hero-dots', hero);
    var cur = 0, timer = null;
    var dots = slides.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Photo ' + (i + 1));
      b.addEventListener('click', function () { go(i); restart(); });
      dotsBox.appendChild(b);
      return b;
    });
    var go = function (i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        s.classList.toggle('is-active', k === cur);
        var im = $('img', s);
        if (k === cur && im) { im.loading = 'eager'; }
      });
      dots.forEach(function (d, k) {
        d.classList.toggle('is-active', k === cur);
        if (k === cur) { d.setAttribute('aria-current', 'true'); } else { d.removeAttribute('aria-current'); }
      });
    };
    var restart = function () {
      clearInterval(timer);
      if (!reduced) { timer = setInterval(function () { go(cur + 1); }, 6000); }
    };
    $('.hero-nav.prev', hero).addEventListener('click', function () { go(cur - 1); restart(); });
    $('.hero-nav.next', hero).addEventListener('click', function () { go(cur + 1); restart(); });
    hero.addEventListener('mouseenter', function () { clearInterval(timer); });
    hero.addEventListener('mouseleave', restart);
    var x0 = null;
    hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (x0 === null) { return; }
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); restart(); }
    });
    go(0);
    restart();
  }

  /* Portfolio : filtre, chargement progressif, visionneuse */
  var pf = $('.pf');
  if (pf) {
    var STEP = 60;
    var items = $$('.pf-item', pf);
    var moreBtn = $('.pf-more-btn', pf);
    var filter = 'all', shown = STEP;
    var matches = function () {
      return items.filter(function (it) {
        return filter === 'all' || it.getAttribute('data-cat').split(' ').indexOf(filter) !== -1;
      });
    };
    var render = function () {
      var m = matches();
      items.forEach(function (it) { it.hidden = true; });
      m.slice(0, shown).forEach(function (it) { it.hidden = false; });
      moreBtn.hidden = m.length <= shown;
    };
    $$('.pf-filter button', pf).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.pf-filter button', pf).forEach(function (o) { o.classList.remove('is-current'); });
        b.classList.add('is-current');
        filter = b.getAttribute('data-filter');
        shown = STEP;
        render();
      });
    });
    moreBtn.addEventListener('click', function () { shown += STEP; render(); });
    render();

    var lb = document.createElement('div');
    lb.className = 'lb';
    lb.hidden = true;
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Visionneuse');
    lb.innerHTML = '<button type="button" class="lb-close" aria-label="Fermer">&times;</button>' +
      '<button type="button" class="lb-prev" aria-label="Précédente">&#8249;</button>' +
      '<img alt=""><p class="lb-cap"></p>' +
      '<button type="button" class="lb-next" aria-label="Suivante">&#8250;</button>';
    document.body.appendChild(lb);
    var lbImg = $('img', lb), lbCap = $('.lb-cap', lb), pos = 0, list = [], opener = null;
    var show = function (i) {
      pos = (i + list.length) % list.length;
      var a = $('a', list[pos]);
      lbImg.src = a.getAttribute('href');
      lbImg.alt = a.getAttribute('title') || '';
      lbCap.textContent = a.getAttribute('title') || '';
    };
    var close = function () { lb.hidden = true; lbImg.removeAttribute('src'); if (opener) { opener.focus(); } };
    pf.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('.pf-item a') : null;
      if (!a) { return; }
      e.preventDefault();
      opener = a;
      list = matches();
      show(list.indexOf(a.parentNode));
      lb.hidden = false;
      $('.lb-close', lb).focus();
    });
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', function () { show(pos - 1); });
    $('.lb-next', lb).addEventListener('click', function () { show(pos + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) { close(); } });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) { return; }
      if (e.key === 'Escape') { close(); }
      if (e.key === 'ArrowLeft') { show(pos - 1); }
      if (e.key === 'ArrowRight') { show(pos + 1); }
    });
  }

  /* Formulaires : validation puis ouverture du logiciel de messagerie (mailto) */
  var CONF = {
    contact: { to: CONTACT_TO, subject: function (d) { return 'Message depuis love-and-lemon.fr' + (d.Nom ? ' (' + d.Nom + ')' : ''); } },
    devis: { to: DEVIS_TO, subject: function (d) { return 'Demande de devis' + (d.Nom ? ' : ' + d.Nom : ''); } }
  };
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var setError = function (host, ctrl, msg) {
    var err = $('.fld-err', host);
    if (!msg) {
      if (err) { err.remove(); }
      if (ctrl) { ctrl.removeAttribute('aria-invalid'); ctrl.removeAttribute('aria-describedby'); }
      return;
    }
    if (!err) {
      err = document.createElement('span');
      err.className = 'fld-err';
      err.id = 'err-' + Math.random().toString(36).slice(2, 8);
      host.appendChild(err);
    }
    err.textContent = msg;
    if (ctrl) { ctrl.setAttribute('aria-invalid', 'true'); ctrl.setAttribute('aria-describedby', err.id); }
  };

  $$('form[data-form]').forEach(function (form) {
    var conf = CONF[form.getAttribute('data-form')];
    var status = $('.form-status', form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      $$('input[type=text],input[type=email],input[type=tel],textarea', form).forEach(function (c) {
        var v = c.value.trim(), msg = '';
        if (c.required && !v) { msg = 'Ce champ est obligatoire.'; }
        else if (v && c.type === 'email' && !EMAIL.test(v)) { msg = 'Adresse e-mail invalide.'; }
        setError(c.parentNode, c, msg);
        if (msg && !first) { first = c; }
      });
      $$('fieldset[data-required]', form).forEach(function (g) {
        var ok = $$('input:checked', g).length > 0;
        setError(g, null, ok ? '' : 'Veuillez faire au moins un choix.');
        if (!ok && !first) { first = $('input', g); }
      });
      if (first) {
        status.textContent = '';
        first.focus();
        return;
      }
      var data = {}, lines = [];
      $$('input[type=text],input[type=email],input[type=tel],textarea', form).forEach(function (c) {
        data[c.name] = c.value.trim();
        if (c.value.trim()) { lines.push(c.name + ' : ' + c.value.trim()); }
      });
      var groups = {};
      $$('input[type=checkbox]:checked', form).forEach(function (c) { (groups[c.name] = groups[c.name] || []).push(c.value); });
      Object.keys(groups).forEach(function (k) { lines.push(k + ' : ' + groups[k].join(', ')); });
      var href = 'mailto:' + conf.to + '?subject=' + encodeURIComponent(conf.subject(data)) +
        '&body=' + lines.map(encodeURIComponent).join('%0D%0A');
      status.innerHTML = 'Ce site n\'envoie rien lui-même : votre logiciel de messagerie va s\'ouvrir avec votre message pré-rempli. ' +
        'Relisez-le puis cliquez sur « Envoyer » dans votre messagerie. Si rien ne s\'ouvre, écrivez-nous à ' +
        '<a href="mailto:' + conf.to + '">' + conf.to + '</a>.';
      window.location.href = href;
    });
  });
})();
