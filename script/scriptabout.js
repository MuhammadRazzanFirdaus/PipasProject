// Scroll-triggered fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in');

    const inView = (el, offset = 0) => {
    const top = el.getBoundingClientRect().top;
    return top <= (window.innerHeight || document.documentElement.clientHeight) - offset;
    };

    const runFadeIn = () => {
    elements.forEach(el => {
        if (inView(el, 100)) {
        el.classList.add('visible');
        } else {
        el.classList.remove('visible');
        }
    });
    };

    // Initial check and on scroll
    runFadeIn();
    window.addEventListener('scroll', runFadeIn);
});