// document.addEventListener("DOMContentLoaded", function () {
//     // 載入 JSON 內容
//     fetch('./data/project-detail.json')
//         .then(response => response.json())
//         .then(data => {
//             const project = data.project;

//             // 填充標題
//             document.querySelector(".project-title").textContent = project.title;
//             document.querySelector(".project-category").textContent = project.category;
//             document.querySelector(".project-date").textContent = project.date;
//             // document.querySelector(".project-tags").textContent = project.tags.join(', ');
//             const tagsContainer = document.querySelector(".project-tags");
//             tagsContainer.innerHTML = ''; // 清空原有內容

//             project.tags.forEach(tag => {
//                 const span = document.createElement("span");
//                 span.className = "project-tag";
//                 span.textContent = tag;
//                 tagsContainer.appendChild(span);
//             });

//             // 填充圖片
//             document.querySelector(".project-image-main").style.backgroundImage = `url(${project.mainImage})`;

//             // 填充描述
//             document.querySelector(".project-description").innerHTML = `
//                 <h2>專案概述</h2>
//                 <p>${project.description}</p>

//                 <h2>研究目標</h2>
//                 <ul>
//                     ${project.researchGoals.map(goal => `<li>${goal}</li>`).join('')}
//                 </ul>

//                 <h2>技術實現</h2>
//                 <ul>
//                     ${project.technicalImplementation.map(item => `<li>${item}</li>`).join('')}
//                 </ul>
//             `;

//             // 填充專案資訊
//             document.querySelector(".project-completion-date").textContent = project.completionDate;
//             document.querySelector(".project-developer").textContent = project.developer;
//             document.querySelector(".project-supervisor").textContent = project.supervisor;

//             // 填充相關連結
//             const linksContainer = document.querySelector(".project-links");
//             linksContainer.innerHTML = project.links.map(link => `
//                 <a href="${link.url}" class="project-link">${link.text}</a>
//             `).join('');

//             // 填充圖片集
//             const galleryGrid = document.querySelector(".gallery-grid");
//             galleryGrid.innerHTML = project.galleryImages.map(image => `
//                 <div class="gallery-item" style="background-image: url('${image}');"></div>
//             `).join('');

//             // 填充上一個專案與下一個專案
//             document.querySelector(".nav-previous .nav-project-title").textContent = project.previousProject.title;
//             document.querySelector(".nav-previous .nav-link").setAttribute('href', project.previousProject.url);
//             document.querySelector(".nav-next .nav-project-title").textContent = project.nextProject.title;
//             document.querySelector(".nav-next .nav-link").setAttribute('href', project.nextProject.url);
//         })
//         .catch(error => console.error('Error loading JSON:', error));
// });

function getProjectIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("id"), 10);
}

function fetchAndRenderProject() {
    const projectId = getProjectIdFromURL();
    if (!projectId) {
        document.querySelector(".project-title").textContent = "無效的專案 ID";
        return;
    }

    fetch("./data/project-detail.json")
        .then(res => res.json())
        .then(data => {
            const projectObj = data.find(item => item.project.id === projectId);
            if (!projectObj) {
                document.querySelector(".project-title").textContent = "找不到專案資料";
                return;
            }
            renderProject(projectObj.project);
        })
        .catch(err => {
            console.error("載入 JSON 發生錯誤：", err);
        });
}

function renderProject(project) {
    // 標題、分類、日期
    document.querySelector(".project-title").textContent = project.title;
    document.querySelector(".project-category").textContent = project.category;
    document.querySelector(".project-date").textContent = project.date;

    // 標籤
    const tagsContainer = document.querySelector(".project-tags");
    tagsContainer.innerHTML = "";
    project.tags.forEach(tag => {
        const span = document.createElement("span");
        span.className = "project-tag";
        span.textContent = tag;
        tagsContainer.appendChild(span);
    });

    // 主圖
    const imageMain = document.querySelector(".project-image-main");
    imageMain.innerHTML = `<img src="${project.mainImage}" alt="${project.title}" />`;

    // 描述
    document.querySelector(".project-description").textContent = project.description;

    const descriptionContainer = document.querySelector(".project-description");

    // 清空原本內容
    descriptionContainer.innerHTML = "";

    // 加入描述段落
    const descPara = document.createElement("p");
    descPara.textContent = project.description;
    descriptionContainer.appendChild(descPara);

    // 加入研究目標
    if (project.researchGoals && project.researchGoals.length > 0) {
        const goalsTitle = document.createElement("h3");
        goalsTitle.textContent = "研究目標";
        descriptionContainer.appendChild(goalsTitle);

        const goalsList = document.createElement("ul");
        project.researchGoals.forEach(goal => {
            const li = document.createElement("li");
            li.textContent = goal;
            goalsList.appendChild(li);
        });
        descriptionContainer.appendChild(goalsList);
    }

    // 加入技術實作
    if (project.technicalImplementation && project.technicalImplementation.length > 0) {
        const techTitle = document.createElement("h3");
        techTitle.textContent = "技術實作";
        descriptionContainer.appendChild(techTitle);

        const techList = document.createElement("ul");
        project.technicalImplementation.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            techList.appendChild(li);
        });
        descriptionContainer.appendChild(techList);
    }




    // 資訊欄位
    document.querySelector(".project-completion-date").textContent = project.completionDate;
    document.querySelector(".project-developer").textContent = project.developer;
    document.querySelector(".project-supervisor").textContent = project.supervisor;

    // 連結
    const linksContainer = document.querySelector(".project-links");
    linksContainer.innerHTML = "";
    project.links.forEach(link => {
        const a = document.createElement("a");
        a.className = "project-link";
        a.href = link.url;
        a.target = "_blank";
        a.textContent = link.text;
        linksContainer.appendChild(a);
    });

    // 圖片畫廊
    const gallery = document.querySelector(".gallery-grid");
    gallery.innerHTML = "";
    project.galleryImages.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Gallery Image";
        gallery.appendChild(img);
    });

    // 畫廊標題（有圖才顯示）
    document.querySelector(".gallery-title").textContent = "圖片畫廊";


    // 上一個專案
    const prevLink = document.querySelector(".nav-previous .nav-link");
    const prevTitle = document.querySelector(".nav-previous .nav-project-title");
    if (project.previousProject && project.previousProject.title) {
        prevLink.href = `project-detail.html?id=${project.previousProject.id || ''}`;
        prevTitle.textContent = project.previousProject.title;
    } else {
        prevLink.style.display = "none";
    }

    // 下一個專案
    const nextLink = document.querySelector(".nav-next .nav-link");
    const nextTitle = document.querySelector(".nav-next .nav-project-title");
    if (project.nextProject && project.nextProject.title) {
        nextLink.href = `project-detail.html?id=${project.nextProject.id || ''}`;
        nextTitle.textContent = project.nextProject.title;
    } else {
        nextLink.style.display = "none";
    }

}

document.addEventListener("DOMContentLoaded", fetchAndRenderProject);
