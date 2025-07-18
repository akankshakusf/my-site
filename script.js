// Typing animation for "I'm Akanksha 👋"
const heroText = document.querySelector('.hero-section h2'); // Select the heading
const textToType = "Hi, I'm Akanksha ! "; // Text to type out
const waveEmoji = "👋"; // Wave emoji
let heroIndex = 0;

// Function to simulate typing for hero section
function typeHeroText() {
  if (heroIndex < textToType.length) {
    heroText.textContent = textToType.slice(0, heroIndex + 1); // Add one character at a time
    heroIndex++;
    setTimeout(typeHeroText, 160); // Adjust typing speed (150ms per character)
  } else {
    // Add the wave emoji after typing is complete
    heroText.textContent = textToType + waveEmoji;
    // Add hand wave animation
    const waveSpan = document.querySelector('.hero-section h2 .wave');
    if (waveSpan) {
      waveSpan.classList.add('wave-animation');
    }
  }
}

// Scroll-triggered typing animations for other sections
const sections = [
  {
    id: 'skills',
    text: '- SKILLS -',
    speed: 120,
    played: false,
    element: null
  },
  {
    id: 'experience',
    text: '- EXPERIENCE -',
    speed: 120,
    played: false,
    element: null
  },
  {
    id: 'projects',
    text: '- PROJECTS -',
    speed: 120,
    played: false,
    element: null
  }
];

// Function to handle scroll-triggered typing
function typeSectionText(section) {
  let index = 0;
  section.element.textContent = ''; // Clear the text initially

  function type() {
    if (index < section.text.length) {
      section.element.textContent += section.text.charAt(index);
      index++;
      setTimeout(type, section.speed);
    }
  }
  type();
}

// Set up Intersection Observer for scroll-triggered animations
function setupScrollAnimations() {
  // Initialize section elements
  sections.forEach(section => {
    section.element = document.querySelector(`#${section.id} h2`);
    if (section.element) {
      section.element.textContent = ''; // Clear initially
    } else {
      // Log an error if section heading not found
      console.warn(`Section heading not found for #${section.id}. Is <h2> missing or not a direct child?`);
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sections.forEach(section => {
          // Check if this is the section being observed
          if (entry.target.id === section.id && !section.played && section.element) {
            typeSectionText(section);
            section.played = true;
          }
        });
      }
    });
  }, {
    threshold: 0.1, // Trigger when only 10% of the section is visible (triggers earlier)
    rootMargin: '0px 0px -150px 0px' // Triggers sooner as you scroll
  });

  // Observe each section
  sections.forEach(section => {
    const sectionElement = document.getElementById(section.id);
    if (sectionElement) {
      observer.observe(sectionElement);
    }
  });
}

// Initialize all animations when page loads
window.addEventListener('load', () => {
  // Clear hero text initially
  if (heroText) heroText.textContent = '';

  // Start hero animation
  if (heroText) typeHeroText();

  // Set up scroll animations
  setupScrollAnimations();
});

window.addEventListener('DOMContentLoaded', function() {
  // Wait 300ms for extra smoothness
  setTimeout(() => {
    const heroTextDiv = document.querySelector('.hero-section .text');
    if (heroTextDiv) heroTextDiv.classList.add('visible');
  }, 500);
});


// Fallback check for elements (in case of slow loading)
const checkElements = setInterval(() => {
  const projectsElement = document.querySelector('#projects h2');
  if (projectsElement) {
    clearInterval(checkElements);
    // Re-run setup if projects wasn't found initially
    if (!sections[2].played) {
      setupScrollAnimations();
    }
  }
}, 100);

// Headshot Animation: Fade in + Scale up
window.addEventListener('DOMContentLoaded', function() {
  const headshotImg = document.querySelector('.headshot img');
  if (headshotImg) {
    headshotImg.style.opacity = 0;
    headshotImg.style.transform = 'translateX(-60px)';
    headshotImg.style.transition = 'opacity 1.2s cubic-bezier(0.4,0,0.2,1), transform 1.2s cubic-bezier(0.4,0,0.2,1)';
    setTimeout(() => {
      headshotImg.style.opacity = 1;
      headshotImg.style.transform = 'translateX(0)';
    }, 700); // Delay to sync with text
  }
});

