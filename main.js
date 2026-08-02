document.addEventListener('DOMContentLoaded', () => {

  // menu mobile
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) { 
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // marca link ativo no menu
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // reveal on scroll
  const toReveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    toReveal.forEach(el => io.observe(el));
  } else {
    toReveal.forEach(el => el.classList.add('in'));
  }

  // acordeão dos cards de time
  document.querySelectorAll('.team-card__top').forEach(top => {
    top.addEventListener('click', () => {
      const card = top.closest('.team-card');
      card.classList.toggle('open');
    });
  });

  // filtro de ligas na página de times
  const filterBtns = document.querySelectorAll('.filter-btn');
  const teamCards = document.querySelectorAll('[data-league]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const league = btn.dataset.filter;
        teamCards.forEach(card => {
          const show = league === 'todas' || card.dataset.league === league;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // formulário de contato (demonstrativo, sem backend)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('form-msg');
      msg.textContent = 'Mensagem enviada! Nossa equipe retorna em até 2 dias úteis. (Formulário demonstrativo — nenhum dado é enviado a um servidor.)';
      msg.classList.add('show');
      form.reset();
    });
  }
});