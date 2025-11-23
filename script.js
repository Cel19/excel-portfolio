document.addEventListener('DOMContentLoaded', () => {
  // ---------------- Footer Year ----------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------------- Theme Toggle ----------------
  const themeToggle = document.getElementById('themeToggle');
  themeToggle?.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    if (isLight) {
      document.documentElement.style.setProperty('--bg','#ffffff');
      document.documentElement.style.setProperty('--card','#f7f9fa');
      document.documentElement.style.setProperty('--muted','#5b6b73');
      document.documentElement.style.setProperty('--accent','#1a7c4c');
      document.documentElement.style.setProperty('--text','#1a1a1a');
      document.documentElement.style.setProperty('--btn-start','#a6d9b8');
      document.documentElement.style.setProperty('--btn-end','#66b478');
      document.documentElement.style.setProperty('--shadow-color', 'rgba(0,0,0,0.2)');
      document.body.style.color='#1a1a1a';
      document.body.style.background='#ffffff';
    } else {
      document.documentElement.style.setProperty('--bg','#0b0f14');
      document.documentElement.style.setProperty('--card','#0f161b');
      document.documentElement.style.setProperty('--muted','#9aa4ad');
      document.documentElement.style.setProperty('--accent','#7ee787');
      document.documentElement.style.setProperty('--text','#e6eef3');
      document.documentElement.style.setProperty('--btn-start','#133d21');
      document.documentElement.style.setProperty('--btn-end','#1a5f2d');
      document.documentElement.style.setProperty('--shadow-color', 'rgba(255,255,255,0.1)');
      document.body.style.color='#e6eef3';
      document.body.style.background='var(--bg)';
    }
  });

  // ---------------- Project Modal (Text Details) ----------------
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.project .link-btn').forEach(link => {
    link?.addEventListener('click', e => {
      e.preventDefault();
      modalTitle && (modalTitle.textContent = link.dataset.title || 'Project');
      modalDesc && (modalDesc.textContent = link.dataset.desc || 'No details provided.');
      modal?.classList.add('show');
      modal?.setAttribute('aria-hidden','false');
      if(modal){
        modal.style.opacity = 0;
        modal.style.transform = 'scale(0.9)';
        requestAnimationFrame(() => {
          modal.style.transition = 'all 0.3s ease';
          modal.style.opacity = 1;
          modal.style.transform = 'scale(1)';
        });
      }
    });
  });

  modalClose?.addEventListener('click', () => {
    if(modal){
      modal.style.transition = 'all 0.2s ease';
      modal.style.opacity = 0;
      modal.style.transform = 'scale(0.9)';
      setTimeout(() => {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden','true');
      },200);
    }
  });

  // ---------------- Certificate Modal ----------------
  const certModal = document.getElementById('certModal');
  const certModalImg = document.getElementById('certModalImg');
  const certModalTitle = document.getElementById('certModalTitle');
  const certModalClose = document.getElementById('certModalClose');

  document.querySelectorAll('.cert-img').forEach(img => {
    img?.addEventListener('click', () => {
      if(certModalImg) certModalImg.src = img.src;
      if(certModalTitle) certModalTitle.textContent = img.nextElementSibling?.textContent || '';
      certModal?.classList.add('show');
      certModal?.setAttribute('aria-hidden','false');
    });
  });

  certModalClose?.addEventListener('click', () => {
    certModal?.classList.remove('show');
    certModal?.setAttribute('aria-hidden','true');
  });

  // ---------------- Nav Highlight on Click ----------------
  const navLinks = document.querySelectorAll('.navlinks a');
  navLinks.forEach(link => {
    link?.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ---------------- Mobile Menu Toggle ----------------
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navlinks');

  menuBtn?.addEventListener('click', () => {
    navMenu?.classList.toggle('show');
  });

  document.querySelectorAll('.navlinks a').forEach(link => {
    link?.addEventListener('click', () => {
      navMenu?.classList.remove('show');
    });
  });

  // ---------------- Hero & Scroll Animations ----------------
  const heroInner = document.querySelector('.hero-inner');
  const blob = document.querySelector('.blob');

  if(heroInner){
    heroInner.style.opacity = 0;
    heroInner.style.transform = 'translateY(20px)';
    requestAnimationFrame(() => {
      heroInner.style.transition = 'all 1s ease';
      heroInner.style.opacity = 1;
      heroInner.style.transform = 'translateY(0)';
    });
  }

  if(blob){
    let angle = 0;
    let scale = 1;
    let grow = true;
    const rotateBlob = () => {
      angle += 0.02;
      if(grow){ scale += 0.0008; if(scale > 1.03) grow = false; }
      else { scale -= 0.0008; if(scale < 0.97) grow = true; }
      blob.style.transform = `rotate(${angle}rad) scale(${scale})`;
      requestAnimationFrame(rotateBlob);
    };
    rotateBlob();
  }

  // ---------------- Scroll Reveal ----------------
  const sections = document.querySelectorAll('main .section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(sec => observer.observe(sec));

  
  // ---------------- Multi-image Project Modal (FIXED) ----------------
  const projImgModal = document.getElementById('projImgModal');
  const projImgModalImg = document.getElementById('projImgModalImg');
  const projImgModalClose = document.getElementById('projImgModalClose');
  const projPrevBtn = document.getElementById('projPrevBtn');
  const projNextBtn = document.getElementById('projNextBtn');

  let currentImages = []; // Listahan ng images para sa active project
  let currentImgIndex = 0;

  // Function to update image display
  function showProjectImage() {
    if(projImgModalImg && currentImages.length > 0) {
      projImgModalImg.src = currentImages[currentImgIndex];
    }
  }

  // FIX: Gumamit ng Event Delegation para gumana ang click kahit sa duplicated/cloned items ng slider
  document.addEventListener('click', (e) => {
    // Hanapin kung ang na-click ay isang .project o nasa loob ng .project
    const project = e.target.closest('.project');

    // Kung valid na project AT may data-images
    if (project && project.dataset.images) {
      const imagesAttr = project.dataset.images || '';
      const images = imagesAttr.split(',').map(i => i.trim()).filter(i => i);

      if(images.length > 0) {
        // Set global variables
        currentImages = images;
        currentImgIndex = 0;

        showProjectImage();
        
        projImgModal?.classList.add('show');
        projImgModal?.setAttribute('aria-hidden', 'false');
      }
    }
  });

  // Next Button
  projNextBtn?.addEventListener('click', (e) => {
    e.stopPropagation(); // Iwasan ma-trigger ang ibang click events
    if(currentImages.length > 0) {
      currentImgIndex = (currentImgIndex + 1) % currentImages.length;
      showProjectImage();
    }
  });

  // Prev Button
  projPrevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if(currentImages.length > 0) {
      currentImgIndex = (currentImgIndex - 1 + currentImages.length) % currentImages.length;
      showProjectImage();
    }
  });

  // Close Button
  projImgModalClose?.addEventListener('click', () => {
    projImgModal?.classList.remove('show');
    projImgModal?.setAttribute('aria-hidden', 'true');
    currentImages = []; // Reset
  });
  
  // ---------------- Seamless Infinite Scroll Logic ----------------
  const scrollers = document.querySelectorAll(".projects-slider");

  scrollers.forEach((scroller) => {
    const scrollerInner = scroller.querySelector(".slider-track");
    const scrollerContent = Array.from(scrollerInner.children);
    
    // Kung konti lang projects (less than 4), paramihin ang clone para mapuno ang screen
    const contentCount = scrollerContent.length;
    const clonesNeeded = contentCount < 4 ? 4 : 2; 

    for (let i = 0; i < clonesNeeded; i++) {
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true); // Para di basahin ng screen reader ng paulit-ulit
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  });
});