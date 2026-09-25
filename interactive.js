/* ==========================================
   INCREDIBLE INDIA - INTERACTIVE MODULE
   Page-Specific Features: Timeline, Cuisine Filter, Destination Modal, Lightbox, FAQs
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStatsCounter();
  initTimelineTabs();
  initCuisineFilter();
  initDestinationModal();
  initLightboxGallery();
  initFaqAccordion();
  initContactForm();
});

/* --- 1. HOME PAGE ANIMATED STATS COUNTER --- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const suffix = entry.target.getAttribute('data-suffix') || '';
        let count = 0;
        const speed = target / 50;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            entry.target.innerText = Math.ceil(count).toLocaleString() + suffix;
            setTimeout(updateCount, 25);
          } else {
            entry.target.innerText = target.toLocaleString() + suffix;
          }
        };
        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

/* --- 2. HISTORY PAGE TIMELINE ERA TABS --- */
function initTimelineTabs() {
  const tabs = document.querySelectorAll('.timeline-tabs .tab-btn');
  const items = document.querySelectorAll('.timeline-item');

  if (!tabs.length || !items.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const era = tab.getAttribute('data-era');

      items.forEach(item => {
        if (era === 'all' || item.getAttribute('data-era') === era) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --- 3. CUISINE PAGE DIETARY & REGION FILTER --- */
function initCuisineFilter() {
  const chips = document.querySelectorAll('.filter-container .filter-chip');
  const cards = document.querySelectorAll('.cuisine-card');

  if (!chips.length || !cards.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const category = chip.getAttribute('data-filter');

      cards.forEach(card => {
        const tags = card.getAttribute('data-category') || '';
        if (category === 'all' || tags.includes(category)) {
          card.style.display = 'flex';
          card.style.animation = 'scaleUp 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 4. TOURISM DESTINATION DETAILS MODAL --- */

const destinationData = {
  taj: {
    title: "Taj Mahal, Agra",
    region: "North India (Uttar Pradesh)",
    vibe: "Heritage & Wonder of the World",
    bestTime: "October to March",
    image: "images/hero_taj_mahal.jpg",
    desc: "An ivory-white marble mausoleum on the south bank of the Yamuna river. Commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. It is widely considered one of the universally admired masterpieces of the world's heritage."
  },
  kerala: {
    title: "Kerala Backwaters",
    region: "South India (Kerala)",
    vibe: "Nature & Tranquility",
    bestTime: "September to March",
    image: "images/kerala_backwaters.jpg",
    desc: "A serene network of interconnected canals, rivers, lakes, and inlets formed by more than 900 km of waterways. Cruising through these backwaters on a traditional wooden Kettuvallam houseboat is one of Asia's most authentic travel experiences."
  },
  temple: {
    title: "Ancient Temples of Hampi & Madurai",
    region: "South & Central India",
    vibe: "Architecture & History",
    bestTime: "November to February",
    image: "images/ancient_temple.jpg",
    desc: "Immerse yourself in monumental stone carvings, soaring gopurams, and UNESCO-listed ruins of Vijayanagara empire in Hampi alongside the vivid colors of Meenakshi Amman Temple in Madurai."
  },
  tiger: {
    title: "Ranthambore National Park",
    region: "North West India (Rajasthan)",
    vibe: "Wildlife & Safari",
    bestTime: "October to June",
    image: "images/bengal_tiger.jpg",
    desc: "One of the largest and most famous national parks in Northern India. Former royal hunting grounds of the Maharajas of Jaipur, today it is a premier sanctuary for wild Royal Bengal Tigers amid ancient ruins."
  },
  diwali: {
    title: "Varanasi & Cultural Festivals",
    region: "North East India (Uttar Pradesh)",
    vibe: "Spiritual & Celebrations",
    bestTime: "October to March",
    image: "images/diwali_festival.jpg",
    desc: "Experience Dev Deepavali and Ganga Aarti on the historic ghats of Varanasi. Thousands of earthen diyas float on the sacred river Ganges, illuminating one of the world's oldest continuously inhabited cities."
  },
  thali: {
    title: "Culinary Capitals: Delhi, Jaipur, & Kochi",
    region: "Pan India",
    vibe: "Gastronomy & Culture",
    bestTime: "Year Round",
    image: "images/cuisine_spread.jpg",
    desc: "Take your tastebuds on a journey from street food in Old Delhi to royal Mughlai banquets in Rajasthan and fresh seafood curries simmered in coconut milk along the Malabar Coast."
  }
};

function initDestinationModal() {
  const modal = document.getElementById('destination-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const triggerBtns = document.querySelectorAll('[data-destination]');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const destKey = btn.getAttribute('data-destination');
      const data = destinationData[destKey];

      if (data) {
        document.getElementById('modal-img').src = data.image;
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-region').innerText = data.region;
        document.getElementById('modal-vibe').innerText = `✨ ${data.vibe} | 🗓️ ${data.bestTime}`;
        document.getElementById('modal-desc').innerText = data.desc;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* --- 5. GALLERY LIGHTBOX MODAL --- */
function initLightboxGallery() {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = modal.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.innerText || '';

      if (img) {
        lightboxImg.src = img.src;
        lightboxCaption.innerText = title;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeLightbox);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeLightbox();
  });
}

/* --- 6. CONTACT PAGE FAQ ACCORDION --- */
function initFaqAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all items
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));

      // Open clicked item if it wasn't already open
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* --- 7. CONTACT FORM VALIDATION & INTERACTIVE TOAST --- */
function initContactForm() {
  const form = document.getElementById('travel-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      alert('Please complete all required fields in the form.');
      return;
    }

    // Show custom visual feedback
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '✨ Message Sent Successfully!';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-emerald');
    btn.disabled = true;

    form.reset();

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('btn-emerald');
      btn.classList.add('btn-primary');
      btn.disabled = false;
    }, 4000);
  });
}
