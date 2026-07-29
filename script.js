// Gallery Data
const galleries = {
  junion: [
    { src: 'assets/junion/Frame 9.png', caption: 'Карточка 1' },
    { src: 'assets/junion/Frame 10.png', caption: 'Карточка 2' },
    { src: 'assets/junion/Frame 11.png', caption: 'Карточка 3' },
    { src: 'assets/junion/Frame 12.png', caption: 'Карточка 4' },
    { src: 'assets/junion/Frame 13.png', caption: 'Карточка 5' }
  ],
  pragma: [
    { src: 'assets/pragma/Frame 2.png', caption: 'Карточка 1' },
    { src: 'assets/pragma/Frame 3.png', caption: 'Карточка 2' },
    { src: 'assets/pragma/Frame 7.png', caption: 'Карточка 3' },
    { src: 'assets/pragma/Frame 8.png', caption: 'Карточка 4' }
  ]
};

let currentGalleryKey = null;
let currentImageIndex = 0;

// Lightbox Functions
function openLightbox(galleryKey, index) {
  if (!galleries[galleryKey] || !galleries[galleryKey][index]) return;
  
  currentGalleryKey = galleryKey;
  currentImageIndex = index;
  
  updateLightbox();
  
  const modal = document.getElementById('lightbox');
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
  
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox');
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

function updateLightbox() {
  const item = galleries[currentGalleryKey][currentImageIndex];
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  
  img.src = item.src;
  caption.textContent = `${item.caption} (${currentImageIndex + 1} / ${galleries[currentGalleryKey].length})`;
}

function nextLightbox() {
  if (!currentGalleryKey) return;
  currentImageIndex = (currentImageIndex + 1) % galleries[currentGalleryKey].length;
  updateLightbox();
}

function prevLightbox() {
  if (!currentGalleryKey) return;
  currentImageIndex = (currentImageIndex - 1 + galleries[currentGalleryKey].length) % galleries[currentGalleryKey].length;
  updateLightbox();
}

// Keyboard Navigation for Lightbox
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('lightbox');
  if (modal && modal.classList.contains('active')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  }
});

// Toast Notifications
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  
  toastMsg.textContent = msg;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Copy Text
function copyText(text, successMessage) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage || 'Скопировано в буфер обмена!');
    }).catch(() => {
      fallbackCopy(text, successMessage);
    });
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMessage || 'Скопировано в буфер обмена!');
  } catch (err) {
    showToast('Не удалось скопировать');
  }
  document.body.removeChild(textArea);
}

// Smooth Scroll Helper
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// Download Resume Handler
function downloadResume(e) {
  if (e) e.preventDefault();
  showToast('Скачивание файла резюме...');
  const link = document.createElement('a');
  link.href = 'assets/resume.pdf';
  link.download = 'Резюме_Бренд_дизайнер.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Active Nav Link Observer
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
