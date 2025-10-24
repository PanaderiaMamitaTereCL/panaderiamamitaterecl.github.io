document.addEventListener('DOMContentLoaded', () => {

  // Scroll suave
  document.querySelectorAll('.menu a, .nav-list a').forEach(link => {
    link.addEventListener('click', e => {
      if(link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Menú móvil
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  menuToggle.addEventListener('click', () => menu.classList.toggle('active'));
  document.querySelectorAll('.menu a').forEach(link => link.addEventListener('click', () => menu.classList.remove('active')));

  // Animación productos
  const products = document.querySelectorAll('.product-item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  products.forEach(product => observer.observe(product));

  // Carrusel Hero
  const slides = document.querySelectorAll('.hero-slide');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if(i === index) slide.classList.add('active');
    });
  }

  next.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  prev.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  // Cambio automático cada 5 segundos
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 5000);

  // Enviar pedido vía WhatsApp
  const btnEnviar = document.getElementById('enviarPedido');
  btnEnviar.addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const pedido = document.getElementById('pedido').value.trim();
    if(!nombre || !correo || !pedido){
      alert('Por favor completa todos los campos.');
      return;
    }
    const mensaje = `Pedido de ${nombre} (${correo}): ${pedido}`;
    const url = 'https://wa.me/56949222393?text=' + encodeURIComponent(mensaje);
    window.open(url, '_blank');
  });

});
