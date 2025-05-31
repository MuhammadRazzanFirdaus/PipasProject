document.addEventListener('DOMContentLoaded',function(){
    AOS.init();

    const progressBar = document.getElementById('scrollProgress');
    const progressContainer = document.getElementById('scrollProgressContainer');
    let fadeTimeout;
    function updateProgressBar(){
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        let scrolledPercent = (scrollTop / scrollHeight)*100;
        if(scrolledPercent > 99.5){
            scrolledPercent = 100;
            clearTimeout(fadeTimeout);
            fadeTimeout = setTimeout(() => {
                progressContainer.style.opacity = "0";
            }, 1000);
        } else{
            clearTimeout(fadeTimeout);
            progressContainer.style.opacity = "0.8";
        }
        progressBar.style.width = scrolledPercent + "%";
    }
    window.addEventListener('scroll',updateProgressBar);
    updateProgressBar();

    const toggleBtn = document.getElementById('darkModeToggle');
    const toggleIcon = document.getElementById('toggleIcon');
    function setDarkMode(on){
        if(on){
            document.body.classList.add('dark-mode');
            toggleBtn.setAttribute('aria-pressed', 'true');
            toggleIcon.className = 'bi bi-moon-fill';
            localStorage.setItem('darkMode', 'true');
        }else{
            document.body.classList.remove('dark-mode');
            toggleBtn.setAttribute('aria-pressed', 'false');
            toggleIcon.className = 'bi bi-brightness-high';
            localStorage.removeItem('darkMode');
        }
    }
    toggleBtn.addEventListener('click',()=>{
        setDarkMode(!document.body.classList.contains('dark-mode'));
    });
    if(localStorage.getItem('darkMode') === 'true'){
        setDarkMode(true);
    }

    const hoverCards = document.querySelectorAll('.hover-card');
    hoverCards.forEach(card => {
        card.addEventListener('keydown', e => {
            if(e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
});