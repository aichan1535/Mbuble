// 1. Initialize Standard Background Snowfall
function initSnow() {
    const container = document.getElementById('snow-container');
    for (let i = 0; i < 50; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        const size = Math.random() * 5 + 2;
        flake.style.width = size + 'px';
        flake.style.height = size + 'px';
        flake.style.left = Math.random() * 100 + 'vw';
        container.appendChild(flake);
        flake.animate([{ top: '-10px' }, { top: '100vh' }], {
            duration: Math.random() * 5000 + 5000,
            iterations: Infinity
        });
    }
}

// 2. Scroll Reveal Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. Michael Reacts Logic
function react(text, emoji) {
    const displayEmoji = document.getElementById('display-emoji');
    displayEmoji.style.transform = 'scale(1.3)';
    setTimeout(() => displayEmoji.style.transform = 'scale(1)', 200);
    displayEmoji.innerText = emoji;
    document.getElementById('display-text').innerText = text;
}

// 4. Blizzard Interaction
document.getElementById('blizzard-btn').addEventListener('click', () => {
    const container = document.getElementById('snow-container');
    for (let i = 0; i < 40; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.width = '12px'; flake.style.height = '12px';
        container.appendChild(flake);
        flake.animate([{ top: '40vh', opacity: 1 }, { top: '100vh', opacity: 0 }], { 
            duration: 2000, 
            easing: 'ease-out' 
        });
        setTimeout(() => flake.remove(), 2000);
    }
});

window.onload = initSnow;

const sessionContent = {
    origin: {
        title: "How did $MBUBLE start?",
        desc: "Answer 1: This is a placeholder for the origin story. Explain here how the idea was born and what inspired the $MBUBLE movement.",
    },
    vision: {
        title: "What is the vision?",
        desc: "Answer 2: This is a placeholder for the vision. Detail the roadmap, future goals, and what holders can expect in the coming months.",
    },
    trust: {
        title: "Is the liquidity safe?",
        desc: "Answer 3: This is a placeholder for safety. Provide details about locked liquidity, contract audits, and developer transparency here.",
    }
};

function openInterview(key) {
    const data = sessionContent[key];
    const modal = document.getElementById('interview-modal');
    const modalImg = document.getElementById('modal-img');
    
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-desc').innerText = data.desc;
    
    // Force set the image source again to ensure it triggers
    modalImg.src = "eatmb.jpeg"; 

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeInterview() {
    document.getElementById('interview-modal').classList.remove('active');
    document.body.style.overflow = 'auto'; 
}