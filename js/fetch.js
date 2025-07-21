fetch('components/nav.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-container').innerHTML = html;
    // Script nav langsung dijalankan setelah html dimuat
    const toggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    if (toggle && mobileMenu) {
      toggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
    // Scrollspy nav
    const sections = [
      {id: 'hero-container', nav: ['nav-beranda', 'mnav-beranda']},
      {id: 'tentangKami-container', nav: ['nav-tentang', 'mnav-tentang']},
      {id: 'menu-container', nav: ['nav-menu', 'mnav-menu']},
      {id: 'testimoni-container', nav: ['nav-testimoni', 'mnav-testimoni']},
    ];
    const navLinks = {};
    sections.forEach(s => {
      s.nav.forEach(nid => navLinks[nid] = document.getElementById(nid));
    });
    function onScroll() {
      let scrollPos = window.scrollY + 120; // offset for fixed nav
      let activeIdx = 0;
      for (let i = 0; i < sections.length; i++) {
        const sec = document.getElementById(sections[i].id);
        if (sec) {
          const top = sec.offsetTop;
          if (scrollPos >= top) activeIdx = i;
        }
      }
      sections.forEach((s, idx) => {
        s.nav.forEach(nid => {
          if (navLinks[nid]) {
            navLinks[nid].classList.remove('text-red-700');
            navLinks[nid].classList.add('text-gray-700');
          }
        });
      });
      sections[activeIdx].nav.forEach(nid => {
        if (navLinks[nid]) {
          navLinks[nid].classList.add('text-red-700');
          navLinks[nid].classList.remove('text-gray-700');
        }
      });
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  });

fetch('sections/hero.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('hero-container').innerHTML = html;

    const target = document.getElementById("typing-text");
    const cursor = document.querySelector(".blinking-cursor");

    const fullText = "Ni Putu Merta \nBhuana Ningsih";
    let index = 0;
    let direction = 1;

    function typeLoop() {
      if (direction === 1 && index <= fullText.length) {
        target.textContent = fullText.slice(0, index);
        index++;
        setTimeout(typeLoop, 70);
      } else if (direction === 1) {
        direction = -1;
        setTimeout(typeLoop, 1800);
      } else if (direction === -1 && index >= 0) {
        target.textContent = fullText.slice(0, index);
        index--;
        setTimeout(typeLoop, 20);
      } else {
        direction = 1;
        setTimeout(typeLoop, 1000);
      }
    }

    typeLoop();
    const style = document.createElement("style");
    style.textContent = `
      .blinking-cursor {
        font-weight: bold;
        color: black;
        animation: blink 1s step-start infinite;
        font-size: inherit;
        right: -0.5rem;
        bottom: 0;
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  });


fetch('sections/tentangKami.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('tentangKami-container').innerHTML = html;
      });

fetch('sections/menu.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('menu-container').innerHTML = html;

        // Carousel logic for stacked cards
        const cards = Array.from(document.querySelectorAll('.menu-card'));
        const nextBtn = document.getElementById('menu-next');
        const prevBtn = document.getElementById('menu-prev');
        let currentIndex = 0;

        // Desktop config
        const lefts = ['0px', '120px', '240px', '360px'];
        const zIndexes = [30, 20, 10, 0];
        const rotates = ['-2deg', '1deg', '-1deg', '2deg'];
        // Mobile config
        const leftsMobile = ['0px', '40px', '80px', '120px'];
        const zIndexesMobile = [30, 20, 10, 0];
        const rotatesMobile = ['0deg', '0deg', '0deg', '0deg'];

        function updateCards() {
          const total = cards.length;
          for (let i = 0; i < total; i++) {
            const idx = (currentIndex + i) % total;
            // Desktop
            cards[idx].style.zIndex = zIndexes[i];
            cards[idx].style.left = lefts[i];
            cards[idx].style.transform = `rotate(${rotates[i]})`;
            // Mobile
            if (window.innerWidth < 768) {
              cards[idx].style.zIndex = zIndexesMobile[i];
              cards[idx].style.left = leftsMobile[i];
              cards[idx].style.transform = `rotate(${rotatesMobile[i]})`;
            }
          }
        }

        if (nextBtn && prevBtn) {
          nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCards();
          });
          prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCards();
          });
        }
        window.addEventListener('resize', updateCards);
        updateCards();
      });

fetch('sections/caraPesan.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('caraPesan-container').innerHTML = html;
      });

fetch('sections/mood.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('mood-container').innerHTML = html;
    const moodData = {
      marah: {
        desc: "Sumpah deh, ini tuh masih bisa ditingkatin lagi!",
        emoji: "assets/Faces.svg",
        rotate: "-9deg"
      },
      mikir: {
        desc: "Um.. ini tuh udah ok. Cuma.. bagian ini tuh..",
        emoji: "assets/Faces(4).svg",
        rotate: "6deg"
      },
      senang: {
        desc: "Aku tertarik kolaborasi sama Ana deh, ajak connect ah~",
        emoji: "assets/Faces(5).svg",
        rotate: "-15deg"
      },
      santai: {
        desc: "Ok nih. Bagi link github dong.. hehe",
        emoji: "assets/Faces(2).svg",
        rotate: "-18deg"
      },
      tugas: {
        desc: "Tugasku banyak nih, Ana kayanya bisa bantu.",
        emoji: "assets/Faces(3).svg",
        rotate: "8deg"
      },
      sakit: {
        desc: "Uh.. aku butuh saran. Kayaknya Ana bisa bantu deh.",
        emoji: "assets/Faces(6).svg",
        rotate: "-6deg"
      },
    };

    document.querySelectorAll('[data-mood]').forEach(item => {
      item.addEventListener('click', () => {
        const mood = item.dataset.mood;
        const data = moodData[mood];
        if (!data) return;

        document.getElementById('mood-desc').textContent = data.desc;
        document.getElementById('mood-menu').textContent = data.menu;

        const emojiImg = document.getElementById('mood-emoji');
        emojiImg.src = `${data.emoji}?v=${Date.now()}`;
        emojiImg.style.rotate = data.rotate;

        // WhatsApp message per mood
        const waMessages = {
          marah: "Halo Ana! Aku kurang suka sama portofolio kamu, karena..",
          mikir: "Ana Hyuna, aku suka sih portofolio kamu. Cuma kurang di..",
          senang: "Halo! Aku suka banget sama portofolio kamu! Mau connect LinkedIn atau Socmed gak?",
          santai: "Hai Na! Portofolio kamu udah bagus loh..",
          tugas: "Anaaa.. Aku ada tugas ... Bisa joki bisa gak ya?",
          sakit: "Halo.. Aku cuma mau konsultasi, bisa gak na?"
        };
        const waText = encodeURIComponent(waMessages[mood] || 'Halo Warkop PBB! Saya mau order.');
        const waLink = `https://wa.me/6282146422305?text=${waText}`;
        const waBtn = document.getElementById('mood-wa-link');
        if (waBtn) waBtn.href = waLink;

        document.getElementById('mood-modal').classList.remove('hidden');
      });
    });

    document.getElementById('mood-modal-close').addEventListener('click', () => {
      document.getElementById('mood-modal').classList.add('hidden');
    });
  });

fetch('sections/testimoni.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('testimoni-container').innerHTML = html;
      });

fetch('sections/balikDapur.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('balikDapur-container').innerHTML = html;
  });

fetch('sections/lokasi.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('lokasi-container').innerHTML = html;
      });

fetch('sections/banner.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('banner-container').innerHTML = html;
  });


fetch('components/footer.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('footer-container').innerHTML = html;
      });

document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
    const targetId = e.target.getAttribute('href').slice(1);
    const targetEl = document.getElementById(targetId) || document.querySelector(`[name='${targetId}']`);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
      // Tutup mobile menu jika terbuka
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  }
});