/* ==========================================================================
   animations.js — hero parallax tilt, magnetic buttons, typing effect,
   ambient particle field. Runs independently of script.js.
   ========================================================================== */
(function(){
  "use strict";

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Typing role animation ---------- */
  var ROLES = ["Data Analyst", "Power BI Developer", "Insight Storyteller", "Dashboard Builder"];

  function typeRoles(){
    var el = document.getElementById('typedRole');
    if(!el) return;

    if(prefersReduced){
      el.textContent = ROLES[0];
      return;
    }

    var roleIndex = 0, charIndex = 0, deleting = false;
    var caret = document.createElement('span');
    caret.className = 'type-cursor';

    function tick(){
      var word = ROLES[roleIndex];
      if(!deleting){
        charIndex++;
        el.textContent = word.slice(0, charIndex);
        el.appendChild(caret);
        if(charIndex === word.length){
          deleting = true;
          setTimeout(tick, 1500);
          return;
        }
      } else {
        charIndex--;
        el.textContent = word.slice(0, charIndex);
        el.appendChild(caret);
        if(charIndex === 0){
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 68);
    }
    tick();
  }

  /* ---------- Hero dashboard-card parallax (mouse tilt) ---------- */
  function heroParallax(){
    var visual = document.getElementById('heroVisual');
    if(!visual || prefersReduced) return;
    var cards = visual.querySelectorAll('[data-depth]');
    var raf = null;

    function onMove(e){
      var rect = visual.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;

      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function(){
        cards.forEach(function(card){
          var depth = parseFloat(card.getAttribute('data-depth')) || 10;
          var x = relX * depth;
          var y = relY * depth;
          card.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
        });
      });
    }
    function onLeave(){
      cards.forEach(function(card){ card.style.transform = 'translate(0,0)'; });
    }

    window.addEventListener('mousemove', function(e){
      var rect = visual.getBoundingClientRect();
      if(e.clientX >= rect.left - 200 && e.clientX <= rect.right + 200 &&
         e.clientY >= rect.top - 200 && e.clientY <= rect.bottom + 200){
        onMove(e);
      }
    }, { passive:true });
    visual.addEventListener('mouseleave', onLeave);
  }

  /* ---------- Magnetic buttons ---------- */
  function magneticButtons(){
    if(prefersReduced) return;
    var buttons = document.querySelectorAll('[data-magnetic]');
    buttons.forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.18).toFixed(1) + 'px,' + (y * 0.35).toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function(){
        btn.style.transform = 'translate(0,0)';
      });
    });
  }

  /* ---------- Ambient particle field in hero ---------- */
  function particleField(){
    var field = document.getElementById('particleField');
    if(!field || prefersReduced) return;
    var count = window.innerWidth < 640 ? 12 : 26;
    for(var i = 0; i < count; i++){
      var p = document.createElement('span');
      p.className = 'particle';
      var size = 2 + Math.random() * 3;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
      p.style.animationDuration = (8 + Math.random() * 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.opacity = (0.3 + Math.random() * 0.4).toFixed(2);
      field.appendChild(p);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    typeRoles();
    heroParallax();
    magneticButtons();
    particleField();
  });
})();
