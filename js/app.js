import Project from './project.js';
import Todo from './todo.js';
import Storage from './storage.js';
import UI from './ui.js';

let projects = Storage.loadProjects();

if (projects.length === 0) {
    const defaultProject = new Project('Default Project');
    projects.push(defaultProject);
    Storage.saveProjects(projects);
}

document.addEventListener('DOMContentLoaded', () => {
    UI.displayProjects(projects);

    document.getElementById('view-projects-btn').addEventListener('click', () => {
        UI.showProjectsTab();
    });

    document.getElementById('create-project-btn').addEventListener('click', () => {
        const projectName = document.getElementById('new-project-name').value;
        console.log('Attempting to create project:', projectName);
        
        if (projectName.trim()) {
            const newProject = new Project(projectName);
            projects.push(newProject);
            Storage.saveProjects(projects);
            UI.displayProjects(projects);
            document.getElementById('new-project-name').value = '';
            console.log('Project created successfully:', newProject);
        } else {
            console.log('Project name is empty.');
        }
    });    

    document.getElementById('create-todo-btn').addEventListener('click', () => {
        const title = document.getElementById('new-todo-title').value;
        const dueDate = document.getElementById('new-todo-due-date').value;
        const priority = document.getElementById('new-todo-priority').value;
        const currentProjectName = document.getElementById('current-project-name').innerText;

        if (title && dueDate && priority) {
            const newTodo = new Todo(title, '', dueDate, priority);
            const project = projects.find(project => project.name === currentProjectName);
            project.addTodo(newTodo);
            Storage.saveProjects(projects);
            UI.displayTodos(project.todos);

            document.getElementById('new-todo-title').value = '';
            document.getElementById('new-todo-due-date').value = '';
        }
    });

    document.getElementById('view-todos-btn').addEventListener('click', () => {
        if (UI.currentProject) {
            UI.showTodosTab(UI.currentProject);  
        }
        document.getElementById('todo-details-tab').style.display = 'none'; 
    });    
    
});