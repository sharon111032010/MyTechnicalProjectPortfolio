document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/projects.json')
        .then(response => response.json())
        .then(projects => {
            const container = document.querySelector('.projects-grid');

            // 代表作排到最前面，其餘維持原本順序
            const sorted = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

            sorted.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.setAttribute('data-category', project.type.join(' ').toLowerCase());

                const imageHtml = project.img
                    ? `<img src="./img/${project.img}" alt="${project.title}" class="project-img">`
                    : `<div class="project-img project-img-placeholder">${project.icon || '💻'}</div>`;

                const featuredBadge = project.featured ? `<span class="featured-badge">⭐ 代表作</span>` : '';

                card.innerHTML = `
                    <div class="project-img-wrap">
                        ${imageHtml}
                        ${featuredBadge}
                    </div>
                    <div class="project-body">
                        <span class="project-category">${project.category}</span>
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-desc">${project.desc}</p>
                        <a href="${project.link}" class="project-link">查看詳情
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </div>
                `;
                container.appendChild(card);
            });

            setupFilter();
        });
});

function setupFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projects.forEach(project => {
                const projectCategories = project.getAttribute('data-category').split(' ');
                if (category === 'all' || projectCategories.includes(category.toLowerCase())) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}
