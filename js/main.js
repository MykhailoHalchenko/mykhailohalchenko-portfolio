async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        setupTabs(projects);
        displayProject(projects[0]); 
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function setupTabs(projects) {
    const tabButtons = document.getElementById('tab-buttons');
    const tabContent = document.getElementById('tab-content');

    tabButtons.innerHTML = '';
    projects.forEach((project, index) => {
        const button = document.createElement('li');
        button.innerHTML = `<a href="#" data-index="${index}">${project.title}</a>`;
        button.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.tab-buttons a').forEach(a => a.classList.remove('active'));
            button.querySelector('a').classList.add('active');
            displayProject(projects[index]);
        });
        tabButtons.appendChild(button);

        if (index === 0) {
            button.querySelector('a').classList.add('active');
        }
    });
}

function displayProject(project) {
    const tabContent = document.getElementById('tab-content');
    tabContent.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
        <div class="project-gallery">
            ${Array.isArray(project.images) ? project.images.map(img => `<img src="${img}" alt="${project.title} Image">`).join('') : `<img src="${project.images}" alt="${project.title} Image">`}
        </div>
    `;
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});