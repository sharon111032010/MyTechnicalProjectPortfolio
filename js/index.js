// 用 JavaScript 載入 nav.html
fetch('./loadingPort/nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
    });
// 用 JavaScript 載入 nav.html
fetch('./loadingPort/mainHero.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('mainHero-placeholder').innerHTML = data;
    });

// 用 JavaScript 載入 nav.html
fetch('./loadingPort/works.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('works-placeholder').innerHTML = data;
    });

// 用 JavaScript 載入 nav.html
fetch('./loadingPort/skill-bar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('skill-bar-placeholder').innerHTML = data;
    });

// 用 JavaScript 載入 nav.html
fetch('./loadingPort/about.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('about-placeholder').innerHTML = data;
    });

// 用 JavaScript 載入 nav.html
fetch('./loadingPort/journey.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('journey-placeholder').innerHTML = data;
    });

// 用 JavaScript 載入 nav.html
fetch('./loadingPort/contact.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('contact-placeholder').innerHTML = data;
    });

fetch('./loadingPort/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    });

fetch('./loadingPort/nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;

        function smoothScrollTo(targetY, duration = 1500) {
            const startY = window.pageYOffset;
            const distanceY = targetY - startY;
            const startTime = performance.now();

            function scroll(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easing = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                window.scrollTo(0, startY + distanceY * easing);

                if (progress < 1) {
                    requestAnimationFrame(scroll);
                }
            }

            requestAnimationFrame(scroll);
        }

        // navbar 載入後再滾動定位
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const offset = 80; // 根據你的 nav 高度調整
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: "smooth"
                });
            }
        }


    });


// document.addEventListener('DOMContentLoaded', () => {
//     const hash = window.location.hash;
//     if (hash) {
//         const target = document.querySelector(hash);
//         if (target) {
//             setTimeout(() => {
//                 target.scrollIntoView({ behavior: 'smooth' });
//             }, 100); // 等待 DOM 完全 render 完畢
//         }
//     }
// });


document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (!hash) return;

    let attempts = 0;
    const maxAttempts = 20;

    const tryScroll = () => {
        const target = document.querySelector(hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(tryScroll, 100);
        }
    };

    tryScroll();
});