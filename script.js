const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      });
    });

    document.getElementById('year').textContent = new Date().getFullYear();

    const dateInput = document.getElementById('tanggal');
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    dateInput.min = localToday;

    document.getElementById('appointmentForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('nama').value.trim();
      const poli = document.getElementById('poli').value;
      const date = document.getElementById('tanggal').value;
      const notice = document.getElementById('formNotice');
      const readableDate = new Date(date + 'T00:00:00').toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
      notice.textContent = `Terima kasih, ${name}. Permintaan janji temu untuk ${poli} pada ${readableDate} sudah tercatat di demo ini. Ini belum merupakan konfirmasi resmi dari rumah sakit.`;
      notice.style.display = 'block';
      notice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });


    // Efek tilt 3D mengikuti posisi mouse pada kartu pilihan.
    const tiltCards = document.querySelectorAll('.tilt-card, .service-card, .doctor-card, .contact-card');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
      tiltCards.forEach(card => {
        card.addEventListener('mousemove', (event) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          const rotateY = (x - 0.5) * 7;
          const rotateX = (0.5 - y) * 7;
          card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    }
