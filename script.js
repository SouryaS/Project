// Music Player Controls
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicText = musicToggle.querySelector('.music-text');
    
    // Set initial volume and loop
    bgMusic.volume = 0.3;
    bgMusic.loop = true;

    // Keep track of music state
    let isMusicPlaying = false;

    // Simplified sound effects
    const soundEffects = {
        click: new Audio('https://www.soundjay.com/button/sounds/button-21.mp3')
    };
    
    // Set sound effects volume
    soundEffects.click.volume = 0.1;
    soundEffects.click.preload = 'auto';

    // Optimized button text update
    function updateButtonText() {
        musicText.textContent = isMusicPlaying ? 'Pause Music' : 'Play Music';
        musicToggle.classList.toggle('playing', isMusicPlaying);
    }

    // Optimized music controls
    function playMusic() {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMusicPlaying = true;
                updateButtonText();
            }).catch(error => {
                console.error('Error playing music:', error);
                isMusicPlaying = false;
                updateButtonText();
            });
        }
    }

    function pauseMusic() {
        bgMusic.pause();
        isMusicPlaying = false;
        updateButtonText();
    }

    function toggleMusic() {
        if (isMusicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    // Add click event listener
    musicToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMusic();
    });

    // Touch-optimized event listeners
    musicToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleMusic();
    });

    // Optimized visibility change handler
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !isMusicPlaying) {
            updateButtonText();
        }
    });

    // Set initial button state
    updateButtonText();

    // Optimized image interactions
    document.querySelectorAll('.thumb').forEach(img => {
        img.addEventListener('touchstart', (e) => {
            e.preventDefault();
            img.style.transform = 'scale(1.05)';
        });

        img.addEventListener('touchend', () => {
            img.style.transform = '';
        });
    });

    // Optimized link interactions
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            soundEffects.click.currentTime = 0;
            soundEffects.click.play();
        });
        
        // For mobile devices
        link.addEventListener('touchend', (e) => {
            soundEffects.click.currentTime = 0;
            soundEffects.click.play();
            // Don't prevent default to allow normal navigation
        });
    });

    // Handle button clicks properly on mobile
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('touchend', (e) => {
            const link = button.querySelector('a');
            if (link) {
                e.preventDefault();
                link.click(); // Trigger the link's click event
            }
        });
    });

    // Get all headers and set up both animation and touch handling
    const headers = document.querySelectorAll('h1, h2, h3, .rem-title');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    headers.forEach(header => {
        // Apply animations for all devices
        const text = header.textContent;
        header.textContent = '';
        [...text].forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            header.appendChild(span);
        });

        // Prevent double-tap zoom on headers
        header.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        // Add touch feedback without zooming
        header.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });

        header.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });

    // Add viewport meta tag to prevent user scaling while keeping animations
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    document.getElementsByTagName('head')[0].appendChild(meta);
});

// Optimized smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('touchstart', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 