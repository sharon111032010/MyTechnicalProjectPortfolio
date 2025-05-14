//////////////////////////這裡是一個選染html 檔案的一個js程式碼

// for (let i = 1; i <= 11; i++) {
//     fetch(`./workPort/workPort${i}.html`)
//         .then(response => response.text())
//         .then(data => {
//             const container = document.getElementById(`workPort${i}`);
//             if (!container) return; // Prevent error if ID not found

//             container.innerHTML = data;

//             // Fix image paths
//             container.querySelectorAll('img').forEach(img => {
//                 const src = img.getAttribute('src');
//                 if (!src.startsWith('http') && !src.startsWith('/')) {
//                     img.src = `./workPort/${src}`;
//                 }
//             });

//             // Scroll after last file is loaded (i === 11)
//             if (i === 11 && window.location.hash) {
//                 const target = document.querySelector(window.location.hash);
//                 if (target) {
//                     const offset = 80;
//                     const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
//                     window.scrollTo({
//                         top: elementPosition - offset,
//                         behavior: "smooth"
//                     });
//                 }
//             }
//         });
// }




// const filterButtons = document.querySelectorAll('.filter-btn');
// const projects = document.querySelectorAll('.project-card');

// filterButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const category = button.getAttribute('data-filter');

//         filterButtons.forEach(btn => btn.classList.remove('active'));
//         button.classList.add('active');

//         projects.forEach(project => {
//             const projectCategory = project.getAttribute('data-category');
//             if (category === 'all' || projectCategory === category) {
//                 project.style.display = 'block';
//             } else {
//                 project.style.display = 'none';
//             }
//         });
//     });
// });

///////這裡是渲染json檔案的js程式碼

/*
document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/projects.json')
        .then(response => response.json())
        .then(projects => {
            const container = document.querySelector('.projects-grid');

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.setAttribute('data-category', project.type.toLowerCase());

                card.innerHTML = `
                    <img src="./img/${project.img}" alt="${project.title}" class="project-img">
                    <div class="project-body">
                        <span class="project-category">${project.type}</span>
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

            setupFilter(); // 啟用過濾按鈕功能
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
                const projectCategory = project.getAttribute('data-category');
                if (category === 'all' || projectCategory === category.toLowerCase()) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

*/


document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/projects.json')
        .then(response => response.json())
        .then(projects => {
            const container = document.querySelector('.projects-grid');

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.setAttribute('data-category', project.type.join(' ').toLowerCase());

                card.innerHTML = `
                    <img src="./img/${project.img}" alt="${project.title}" class="project-img">
                    <div class="project-body">
                        <span class="project-category">${project.type.join(', ')}</span>
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

            setupFilter(); // 啟用過濾按鈕功能
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
