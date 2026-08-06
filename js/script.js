/* ==========================================================================
   script.js — navigation, theme, scroll reveal, counters, certificate
   gallery manager (session-based), project filters, contact form.
   ========================================================================== */
(function(){
  "use strict";

  var $  = function(sel, ctx){ return (ctx || document).querySelector(sel); };
  var $$ = function(sel, ctx){ return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ============================================================
     Default certificates (baked in for every visitor — mirrors
     data/certificates.json so the gallery works offline too)
     ============================================================ */
  var DEFAULT_CERTS = [
    { id:"depi-data-analytics", title:"Data Analytics – Google Data Analyst Specialist", provider:"Digital Egypt Pioneers Initiative (DEPI)", date:"Nov 2024 – May 2025", category:"Data Analysis", img:"assets/images/certificates/depi-data-analytics.jpg" },
    { id:"iti-bi-development", title:"Business Intelligence Track — BI Development (120 hrs)", provider:"Information Technology Institute (ITI)", date:"Aug 2024 – Sep 2024", category:"Business Intelligence", img:"assets/images/certificates/iti-bi-development.jpg" },
    { id:"huawei-hcia", title:"Huawei Training Course of Artificial Intelligence — HCIA", provider:"Cairo University × Huawei", date:"Aug 2024", category:"AI & Data", img:"assets/images/certificates/digitera-business.jpeg" },
    { id:"itida-nti-bigdata", title:"Big Data Analysis — Summer Training (120 hrs)", provider:"ITIDA × National Telecommunication Institute", date:"Jul 2025", category:"Data Analysis", img:"assets/images/certificates/itida-nti-bigdata.jpg" },
    { id:"digitera-business", title:"Digitera Program — Business Track", provider:"iCareer × Plan International Egypt", date:"Jun 2026", category:"Business", img:"assets/images/certificates/huawei-hcia.jpg" },
    { id:"depi-business-english", title:"Business English Track — Round 2", provider:"Digital Egypt Pioneers Initiative (DEPI)", date:"Nov 2024 – May 2025", category:"Business", img:"assets/images/certificates/depi-business-english.jpg" }
  ];

  var SESSION_KEY = 'sohila_portfolio_certs_v1';

  document.addEventListener('DOMContentLoaded', function(){
    initLoadingScreen();
    initScrollProgress();
    initNav();
    initThemeToggle();
    initLangToggle();
    initCursorGlow();
    initScrollTop();
    initReveal();
    initCounters();
    initSkillProgress();
    initProjectFilter();
    initCertificates();
    initContactForm();
  });

  /* ---------- Loading screen ---------- */
  function initLoadingScreen(){
    var screen = document.getElementById('loadingScreen');
    if(!screen) return;
    window.addEventListener('load', function(){
      setTimeout(function(){ screen.classList.add('is-hidden'); }, 400);
    });
    // Failsafe in case load event is delayed
    setTimeout(function(){ screen.classList.add('is-hidden'); }, 2600);
  }

  /* ---------- Scroll progress bar ---------- */
  function initScrollProgress(){
    var bar = document.getElementById('scrollProgress');
    if(!bar) return;
    function update(){
      var h = document.documentElement;
      var scrollTop = h.scrollTop || document.body.scrollTop;
      var height = h.scrollHeight - h.clientHeight;
      var pct = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = pct + '%';
    }
    document.addEventListener('scroll', update, { passive:true });
    update();
  }

  /* ---------- Nav: scrolled state, active link, mobile menu, smooth scroll ---------- */
  function initNav(){
    var nav = document.getElementById('mainNav');
    var burger = document.getElementById('navBurger');
    var mobileMenu = document.getElementById('mobileMenu');
    var navLinks = $$('[data-nav]');
    var sections = navLinks.map(function(a){
      var id = a.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.getElementById(id.slice(1)) : null;
    });

    function onScroll(){
      if(!nav) return;
      nav.classList.toggle('is-scrolled', window.scrollY > 40);

      var pos = window.scrollY + (nav.offsetHeight || 80) + 40;
      var activeIndex = -1;
      sections.forEach(function(sec, i){
        if(sec && sec.offsetTop <= pos) activeIndex = i;
      });
      navLinks.forEach(function(a, i){ a.classList.toggle('active', i === activeIndex); });
    }
    document.addEventListener('scroll', onScroll, { passive:true });
    onScroll();

    if(burger && mobileMenu){
      burger.addEventListener('click', function(){
        var open = mobileMenu.classList.toggle('is-open');
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      $$('a', mobileMenu).forEach(function(a){
        a.addEventListener('click', function(){
          mobileMenu.classList.remove('is-open');
          burger.classList.remove('is-open');
        });
      });
    }

    // Smooth scroll with nav-height offset (native scroll-behavior handles most,
    // this covers older engines / precise offset)
    $$('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var id = a.getAttribute('href');
        if(id.length < 2) return;
        var target = document.querySelector(id);
        if(!target) return;
        e.preventDefault();
        var navH = nav ? nav.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navH + 1;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ---------- Theme toggle (light / night — never black or gray) ---------- */
  function initThemeToggle(){
    var btns = $$('#themeToggle, .js-theme-toggle');
    if(!btns.length) return;
    var html = document.documentElement;
    var saved = null;
    try{ saved = sessionStorage.getItem('sohila_theme'); }catch(e){}
    if(saved) html.setAttribute('data-theme', saved);

    function apply(){
      var isNight = html.getAttribute('data-theme') === 'night';
      btns.forEach(function(b){
        b.textContent = isNight ? '☀' : '☾';
        b.title = isNight ? 'Light mode' : 'Night mode';
      });
    }
    apply();

    btns.forEach(function(btn){
      btn.addEventListener('click', function(){
        var isNight = html.getAttribute('data-theme') === 'night';
        var next = isNight ? 'light' : 'night';
        html.setAttribute('data-theme', next);
        try{ sessionStorage.setItem('sohila_theme', next); }catch(e){}
        apply();
      });
    });
  }

  /* ---------- Language toggle (placeholder) ---------- */
  function initLangToggle(){
    var btns = $$('#langToggle, .js-lang-toggle');
    if(!btns.length) return;
    btns.forEach(function(btn){
      btn.addEventListener('click', function(){
        btn.classList.add('is-pulsing');
        var original = btn.textContent;
        btn.textContent = '…';
        setTimeout(function(){
          btn.textContent = original;
          btn.classList.remove('is-pulsing');
        }, 700);
        // Placeholder: full Arabic translation coming soon.
      });
    });
  }

  /* ---------- Cursor glow ---------- */
  function initCursorGlow(){
    var glow = document.getElementById('cursorGlow');
    if(!glow) return;
    if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    var raf = null, x = 0, y = 0;
    window.addEventListener('mousemove', function(e){
      x = e.clientX; y = e.clientY;
      if(!raf){
        raf = requestAnimationFrame(function(){
          glow.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
          raf = null;
        });
      }
    }, { passive:true });
  }

  /* ---------- Scroll to top ---------- */
  function initScrollTop(){
    var btn = document.getElementById('scrollTopBtn');
    if(!btn) return;
    document.addEventListener('scroll', function(){
      btn.classList.toggle('is-visible', window.scrollY > 700);
    }, { passive:true });
    btn.addEventListener('click', function(){
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  function initReveal(){
    var items = $$('.reveal, .reveal-scale');
    if(!items.length) return;

    items.forEach(function(el){
      var d = getComputedStyle(el).getPropertyValue('--d');
      if(d) el.style.transitionDelay = d.trim();
    });

    if(!('IntersectionObserver' in window)){
      items.forEach(function(el){ el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    items.forEach(function(el){ io.observe(el); });
  }

  /* ---------- Animated counters (hero stats) ---------- */
  function initCounters(){
    var nums = $$('.hstat-num[data-count]');
    if(!nums.length) return;

    function animate(el){
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var isFloat = String(target).indexOf('.') !== -1;
      var duration = 1500;
      var start = null;

      function step(ts){
        if(!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = target * eased;
        el.textContent = (isFloat ? value.toFixed(1) : Math.round(value)) + (suffix ? '' : '');
        if(suffix){
          el.innerHTML = (isFloat ? value.toFixed(1) : Math.round(value)) + '<span class="suffix">' + suffix + '</span>';
        }
        if(progress < 1) requestAnimationFrame(step);
        else {
          el.innerHTML = (isFloat ? target.toFixed(1) : target) + (suffix ? '<span class="suffix">' + suffix + '</span>' : '');
        }
      }
      requestAnimationFrame(step);
    }

    if(!('IntersectionObserver' in window)){
      nums.forEach(animate);
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    nums.forEach(function(el){ io.observe(el); });
  }

  /* ---------- Skill progress bar fill on reveal ---------- */
  function initSkillProgress(){
    var cards = $$('.skill-card[data-progress]');
    if(!cards.length) return;

    function fill(card){
      var pct = card.getAttribute('data-progress') + '%';
      var bar = $('.skill-progress-fill', card);
      if(bar) bar.style.width = pct;
    }

    if(!('IntersectionObserver' in window)){
      cards.forEach(fill);
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          setTimeout(function(){ fill(entry.target); }, 150);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    cards.forEach(function(el){ io.observe(el); });
  }

  /* ---------- Project filter ---------- */
  function initProjectFilter(){
    var btns = $$('.pfilter-btn');
    var cards = $$('.project-card');
    if(!btns.length || !cards.length) return;

    btns.forEach(function(btn){
      btn.addEventListener('click', function(){
        btns.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        cards.forEach(function(card){
          var match = filter === 'all' || card.getAttribute('data-category') === filter;
          card.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* ============================================================
     Certificate gallery: render, filter, lightbox, add/edit/delete
     (session-only persistence, per README pattern)
     ============================================================ */
  function loadCerts(){
    try{
      var raw = sessionStorage.getItem(SESSION_KEY);
      if(raw) return JSON.parse(raw);
    }catch(e){}
    return DEFAULT_CERTS.slice();
  }
  function saveCerts(certs){
    try{ sessionStorage.setItem(SESSION_KEY, JSON.stringify(certs)); }catch(e){}
  }

  function initCertificates(){
    var grid = document.getElementById('certGrid');
    if(!grid) return;

    var certs = loadCerts();
    var activeFilter = 'all';
    var editingId = null;

    var overlay = document.getElementById('certModalOverlay');
    var modal = document.getElementById('certModal');
    var modalTitle = document.getElementById('modalTitle');
    var form = document.getElementById('certForm');
    var titleInput = document.getElementById('certTitleInput');
    var providerInput = document.getElementById('certProviderInput');
    var dateInput = document.getElementById('certDateInput');
    var categoryInput = document.getElementById('certCategoryInput');
    var imageInput = document.getElementById('certImageInput');
    var fileDrop = document.getElementById('fileDrop');
    var filePreview = document.getElementById('filePreview');
    var fileDropText = document.getElementById('fileDropText');
    var submitLabel = document.getElementById('modalSubmitLabel');
    var addBtn = document.getElementById('certAddBtn');
    var modalClose = document.getElementById('modalClose');
    var modalCancel = document.getElementById('modalCancel');

    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxClose = document.getElementById('lightboxClose');

    var pendingImageData = null;

    function render(){
      grid.innerHTML = '';
      var visible = certs.filter(function(c){ return activeFilter === 'all' || c.category === activeFilter; });

      if(!visible.length){
        var empty = document.createElement('p');
        empty.style.cssText = 'color:var(--c-muted); font-size:14px; grid-column:1/-1;';
        empty.textContent = 'No certificates in this category yet.';
        grid.appendChild(empty);
        return;
      }

      visible.forEach(function(cert){
        var card = document.createElement('div');
        card.className = 'cert-card reveal is-visible';
        card.innerHTML =
          '<div class="cert-actions">' +
            '<button type="button" class="cert-action-btn" data-edit="' + cert.id + '" aria-label="Edit certificate">✎</button>' +
            '<button type="button" class="cert-action-btn" data-delete="' + cert.id + '" aria-label="Delete certificate">🗑</button>' +
          '</div>' +
          '<div class="cert-thumb" data-view="' + cert.id + '">' +
            '<img src="' + cert.img + '" alt="' + escapeHtml(cert.title) + '" loading="lazy">' +
            '<div class="cert-overlay"><span>🔍 View certificate</span></div>' +
          '</div>' +
          '<div class="cert-body">' +
            '<span class="cert-cat">' + escapeHtml(cert.category) + '</span>' +
            '<h4>' + escapeHtml(cert.title) + '</h4>' +
            '<p>' + escapeHtml(cert.provider) + ' · ' + escapeHtml(cert.date) + '</p>' +
          '</div>';
        grid.appendChild(card);
      });
    }

    function escapeHtml(str){
      var div = document.createElement('div');
      div.textContent = str == null ? '' : str;
      return div.innerHTML;
    }

    render();

    // Filter buttons
    $$('.cert-filter-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        $$('.cert-filter-btn').forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        render();
      });
    });

    // Delegate: view / edit / delete
    grid.addEventListener('click', function(e){
      var viewEl = e.target.closest('[data-view]');
      var editEl = e.target.closest('[data-edit]');
      var delEl = e.target.closest('[data-delete]');

      if(delEl){
        e.stopPropagation();
        var id = delEl.getAttribute('data-delete');
        if(confirm('Remove this certificate from the gallery? (This only affects your current session.)')){
          certs = certs.filter(function(c){ return c.id !== id; });
          saveCerts(certs);
          render();
        }
        return;
      }
      if(editEl){
        e.stopPropagation();
        openModal(editEl.getAttribute('data-edit'));
        return;
      }
      if(viewEl){
        var cert = certs.filter(function(c){ return c.id === viewEl.getAttribute('data-view'); })[0];
        if(cert) openLightbox(cert.img, cert.title);
      }
    });

    // Lightbox
    function openLightbox(src, alt){
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox(){
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
    lightbox && lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });

    // Modal open/close
    function openModal(id){
      editingId = id || null;
      pendingImageData = null;
      if(editingId){
        var cert = certs.filter(function(c){ return c.id === editingId; })[0];
        modalTitle.textContent = 'Edit certificate';
        submitLabel.textContent = 'Save changes';
        titleInput.value = cert.title;
        providerInput.value = cert.provider;
        dateInput.value = cert.date;
        categoryInput.value = cert.category;
        filePreview.src = cert.img;
        filePreview.style.display = 'block';
        fileDropText.style.display = 'none';
        pendingImageData = cert.img;
      } else {
        modalTitle.textContent = 'Add certificate';
        submitLabel.textContent = 'Add certificate';
        form.reset();
        filePreview.style.display = 'none';
        fileDropText.style.display = 'block';
        fileDropText.textContent = 'Click or drag an image here';
      }
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeModal(){
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      editingId = null;
    }

    addBtn && addBtn.addEventListener('click', function(){ openModal(null); });
    modalClose && modalClose.addEventListener('click', closeModal);
    modalCancel && modalCancel.addEventListener('click', closeModal);
    overlay && overlay.addEventListener('click', function(e){ if(e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function(e){
      if(e.key !== 'Escape') return;
      if(overlay && overlay.classList.contains('is-open')) closeModal();
      if(lightbox && lightbox.classList.contains('is-open')) closeLightbox();
    });

    // File drop / picker
    fileDrop && fileDrop.addEventListener('click', function(){ imageInput.click(); });
    fileDrop && fileDrop.addEventListener('dragover', function(e){ e.preventDefault(); fileDrop.style.borderColor = 'var(--c-primary)'; });
    fileDrop && fileDrop.addEventListener('dragleave', function(){ fileDrop.style.borderColor = ''; });
    fileDrop && fileDrop.addEventListener('drop', function(e){
      e.preventDefault();
      fileDrop.style.borderColor = '';
      if(e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
    imageInput && imageInput.addEventListener('change', function(){
      if(imageInput.files && imageInput.files[0]) handleFile(imageInput.files[0]);
    });
    function handleFile(file){
      if(!file.type.startsWith('image/')) return;
      var reader = new FileReader();
      reader.onload = function(e){
        pendingImageData = e.target.result;
        filePreview.src = pendingImageData;
        filePreview.style.display = 'block';
        fileDropText.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }

    // Submit add/edit
    form && form.addEventListener('submit', function(e){
      e.preventDefault();
      var title = titleInput.value.trim();
      var provider = providerInput.value.trim();
      var date = dateInput.value.trim();
      var category = categoryInput.value;
      if(!title || !provider || !date) return;

      if(editingId){
        certs = certs.map(function(c){
          if(c.id !== editingId) return c;
          return Object.assign({}, c, {
            title: title, provider: provider, date: date, category: category,
            img: pendingImageData || c.img
          });
        });
      } else {
        var newCert = {
          id: 'user-' + Date.now(),
          title: title, provider: provider, date: date, category: category,
          img: pendingImageData || 'assets/images/certificates/depi-data-analytics.jpg'
        };
        certs.push(newCert);
      }
      saveCerts(certs);
      render();
      closeModal();
    });
  }

  /* ---------- Contact form validation (client-side only) ---------- */
  function initContactForm(){
    var form = document.getElementById('contactForm');
    if(!form) return;
    var success = document.getElementById('formSuccess');

    var fields = {
      name:    { input: document.getElementById('cfName'),    wrap: document.getElementById('fieldName'),    validate: function(v){ return v.trim().length >= 2 ? '' : 'Please enter your name.'; } },
      email:   { input: document.getElementById('cfEmail'),   wrap: document.getElementById('fieldEmail'),   validate: function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email.'; } },
      subject: { input: document.getElementById('cfSubject'), wrap: document.getElementById('fieldSubject'), validate: function(v){ return v.trim().length >= 3 ? '' : 'Give it a short subject.'; } },
      message: { input: document.getElementById('cfMessage'), wrap: document.getElementById('fieldMessage'), validate: function(v){ return v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'; } }
    };

    function showError(field, msg){
      field.wrap.classList.toggle('has-error', !!msg);
      var errEl = field.wrap.querySelector('.field-error');
      if(errEl) errEl.textContent = msg;
    }

    Object.keys(fields).forEach(function(key){
      var field = fields[key];
      if(!field.input) return;
      field.input.addEventListener('blur', function(){
        showError(field, field.validate(field.input.value));
      });
      field.input.addEventListener('input', function(){
        if(field.wrap.classList.contains('has-error')){
          showError(field, field.validate(field.input.value));
        }
      });
    });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var valid = true;
      Object.keys(fields).forEach(function(key){
        var field = fields[key];
        if(!field.input) return;
        var msg = field.validate(field.input.value);
        showError(field, msg);
        if(msg) valid = false;
      });

      if(!valid){
        success && success.classList.remove('is-visible');
        return;
      }

      success && success.classList.add('is-visible');
      form.reset();
      Object.keys(fields).forEach(function(key){ showError(fields[key], ''); });
      setTimeout(function(){ success && success.classList.remove('is-visible'); }, 6000);
    });
  }

})();
