function toggleDetails(card) {
    const details = card.querySelector('.artist-details');
    const isOpen = details.classList.contains('open');
    details.classList.toggle('open', !isOpen);
}

const quizData = [
    {
        question: "Apa nama tarian tradisional yang terkenal dari Cisarua?",
        options: ["Jaipong", "Samba", "Ballet"],
        answer: "Jaipong"
    },
    {
        question: "Apa alat musik tradisional yang terkenal dari Cisarua?",
        options: ["Gamelan", "Piano", "Gitar"],
        answer: "Gamelan"
    },
    {
        question: "Apa bahan utama kerajinan tangan yang terkenal di Cisarua?",
        options: ["Bambu", "Kain", "Logam"],
        answer: "Bambu"
    },
    {
        question: "Apa nama festival seni yang sering diadakan di Cisarua?",
        options: ["Festival Budaya Cisarua", "Festival Musik Internasional", "Festival Film Cisarua"],
        answer: "Festival Budaya Cisarua"
    },
    {
        question: "Siapa seniman terkenal yang berasal dari Cisarua?",
        options: ["Rini Hartati", "Budi Santoso", "Wayan Suryanata"],
        answer: "Wayan Suryanata"
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary';
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
    document.querySelector('.feedback').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
}

function checkAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    const feedback = document.querySelector('.feedback');
    if (selectedOption === currentQuestion.answer) {
        feedback.innerText = "Jawaban Benar!";
        feedback.style.color = "green";
        document.getElementById('next-button').style.display = 'block';
    } else {
        feedback.innerText = "Jawaban Salah. Coba lagi!";
        feedback.style.color = "red";
    }
    feedback.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        document.getElementById('quiz').innerHTML = "<h3>Terima kasih telah mengikuti kuis!</h3>";
    }
}

// Load the first question on page load
document.addEventListener('DOMContentLoaded', loadQuestion);

// Intersection Observer for fade-in effect
document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    });

    const artistCards = document.querySelectorAll('.artist-card, .info-section');
    artistCards.forEach(card => {
        observer.observe(card);
    });
});