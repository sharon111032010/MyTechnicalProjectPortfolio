// 載入片段 HTML 到指定容器；容器不存在的頁面（例如 aboutMe.html 沒有 works-placeholder）會直接略過
// 注意：容器查找必須放在 fetch 的 .then() 裡，因為這支 script 在 <head> 同步執行，
// 這時 <body> 還沒解析完成，容器元素根本還不存在。
function loadFragment(path, placeholderId, onLoaded) {
    fetch(path)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById(placeholderId);
            if (!container) return;
            container.innerHTML = data;
            if (onLoaded) onLoaded();
        });
}

loadFragment('./loadingPort/mainHero.html', 'mainHero-placeholder');
loadFragment('./loadingPort/works.html', 'works-placeholder');
loadFragment('./loadingPort/skill-bar.html', 'skill-bar-placeholder');
loadFragment('./loadingPort/about.html', 'about-placeholder');
loadFragment('./loadingPort/journey.html', 'journey-placeholder');
loadFragment('./loadingPort/contact.html', 'contact-placeholder');
loadFragment('./loadingPort/footer.html', 'footer-placeholder');

loadFragment('./loadingPort/nav.html', 'nav-placeholder', () => {
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
            const offset = 80; // 根據 nav 高度調整
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth"
            });
        }
    }
});

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
