document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
        return;
        } else {
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
        }
    });
    }, appearOptions);

    faders.forEach(fader => {
    appearOnScroll.observe(fader);
    });

    // Filter event by month or type
    const monthLinks = document.querySelectorAll('a[data-month]');
    const typeLinks = document.querySelectorAll('a[data-type]');
    const eventCards = document.querySelectorAll('#event-cards .card-body, .featured-event .card-body');

    function filterEvents() {
    const selectedMonth = document.querySelector('a[data-month].active')?.dataset.month || 'all';
    const selectedType = document.querySelector('a[data-type].active')?.dataset.type || 'all';

    eventCards.forEach(card => {
        const cardMonth = card.dataset.month;
        const cardType = card.dataset.type;

        const monthMatch = selectedMonth === 'all' || cardMonth === selectedMonth;
        const typeMatch = selectedType === 'all' || cardType === selectedType;

        if (monthMatch && typeMatch) {
        card.parentElement.parentElement.style.display = '';
        } else {
        card.parentElement.parentElement.style.display = 'none';
        }
    });
    }

    monthLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        monthLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        filterEvents();
    });
    });

    typeLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        typeLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        filterEvents();
    });
    });
});