AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });

    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) backToTopBtn.style.display = 'flex';
      else backToTopBtn.style.display = 'none';
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });

    const navLinks = document.querySelectorAll('nav.navbar .nav-link');
    navLinks.forEach(link => {
      if (link.href.includes(location.pathname.split("/").pop())) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });