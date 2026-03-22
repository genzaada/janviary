// Cursor Glow Effect
const cursorGlow = document.querySelector('.cursor-glow');

if (window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener('mousemove', (e) => {
    // We use requestAnimationFrame for smoother performance, but translating directly is okay for this lightweight site
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

// Smooth Scrolling for nav/hero buttons
document.querySelectorAll('[data-target]').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const targetEl = document.getElementById(targetId);
    if(targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Selection logic for donation amounts
const amountBtns = document.querySelectorAll('.amount-btn');
let selectedAmount = null;

amountBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    amountBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedAmount = btn.getAttribute('data-amount');
  });
});

// Scroll Reveal Animation via IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Optional: only animate once
    }
  });
};

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));

// Fake Payment Logic with snarky modal
const payBtn = document.getElementById('payBtn');
const modal = document.getElementById('snark-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');

const snarkyMessages = [
  { amount: 500, title: "Transaction Declined 🤡", desc: "Even the Kuromi in my bank account knows ₹500 is embarrassing. At least buy me a single lip gloss." },
  { amount: 5000, title: "UPI Failed 💀", desc: "Bank server crashed trying to process this. Try using a card with actual money on it, pookie?" },
  { amount: 50000, title: "Security Alert 🚨", desc: "Your bank flagged this because they know you can't afford my coquette lifestyle. BFFR. 🎀" },
  { default: true, title: "Error 404: Funds Not Found 💅", desc: "You need to select a tier first, otherwise I'm charging you for wasting my pink aesthetic time." }
];

payBtn.addEventListener('click', () => {
  // Simulate loading state
  const originalText = payBtn.innerText;
  payBtn.innerText = "Connecting to Bank... ⏳";
  payBtn.style.opacity = '0.7';
  payBtn.style.pointerEvents = 'none';

  setTimeout(() => {
    let msgConfig = snarkyMessages.find(m => m.default);
    
    if (selectedAmount) {
      const config = snarkyMessages.find(m => m.amount == selectedAmount);
      if(config) msgConfig = config;
    }

    modalTitle.innerText = msgConfig.title;
    modalDesc.innerText = msgConfig.desc;
    
    modal.classList.add('active');
    
    // Reset button
    payBtn.innerText = originalText;
    payBtn.style.opacity = '1';
    payBtn.style.pointerEvents = 'auto';
  }, 1500); // 1.5 seconds of fake loading suspense
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});

// Optional: close modal on clicking outside
modal.addEventListener('click', (e) => {
  if(e.target === modal) {
    modal.classList.remove('active');
  }
});
