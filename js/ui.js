import { format } from '../node_modules/date-fns/format.js';
import Storage from './storage.js';

const UI = {
    currentProject: null,

    displayProjects(projects) {
        const projectView = document.getElementById('projects-view');
        projectView.innerHTML = '';
        projects.forEach((project, index) => {
            const projectDiv = document.createElement('div');
            projectDiv.innerHTML = project.name;
            projectDiv.dataset.index = index;
            projectDiv.addEventListener('click', () => {
                UI.showTodosTab(project);
            });
            projectView.appendChild(projectDiv);
        });
    },

    displayTodos(todos) {
        const todosView = document.getElementById('todos-view');
        todosView.innerHTML = '';
        todos.forEach((todo) => {
            const formattedDate = format(new Date(todo.dueDate), 'MM/dd/yyyy');
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo'); 

            if (todo.priority === 'High') {
                todoDiv.classList.add('todo-high');
            } else if (todo.priority === 'Medium') {
                todoDiv.classList.add('todo-medium');
            } else {
                todoDiv.classList.add('todo-low');
            }

            todoDiv.innerHTML = `${todo.title} - ${formattedDate} - Priority: ${todo.priority}`;
            
            todoDiv.addEventListener('click', () => {
                UI.displayTodoDetails(todo);
            });

            todosView.appendChild(todoDiv);
        });
    },

    showProjectsTab() {
        document.getElementById('projects-tab').style.display = 'flex';
        document.getElementById('todos-tab').style.display = 'none';
    },

    showTodosTab(project) {
        UI.currentProject = project; 
        document.getElementById('projects-tab').style.display = 'none';
        document.getElementById('todos-tab').style.display = 'flex';
        document.getElementById('current-project-name').innerText = project.name;
        UI.displayTodos(project.todos);
    },    

    displayTodoDetails(todo) {
        document.getElementById('todos-tab').style.display = 'none';
        document.getElementById('todo-details-tab').style.display = 'flex';

        document.getElementById('todo-title').innerText = todo.title;
        document.getElementById('todo-description').innerText = todo.description || "No description";
        document.getElementById('todo-dueDate').innerText = format(new Date(todo.dueDate), 'MM/dd/yyyy');
        document.getElementById('todo-priority').innerText = todo.priority;

        this.addEditListeners(todo);
    },

    addEditListeners(todo) {
        document.getElementById('edit-title-btn').addEventListener('click', () => {
            document.getElementById('edit-title-container').style.display = 'block';
            document.getElementById('edit-title-input').value = todo.title;
        });
        document.getElementById('confirm-title-change-btn').addEventListener('click', () => {
            const newTitle = document.getElementById('edit-title-input').value.trim();
            if (newTitle) {
                todo.title = newTitle;
                Storage.saveProjects(projects);  
                document.getElementById('todo-title').innerText = newTitle;
                document.getElementById('edit-title-container').style.display = 'none';
            }
        });

        document.getElementById('edit-description-btn').addEventListener('click', () => {
            document.getElementById('edit-description-container').style.display = 'block';
            document.getElementById('edit-description-input').value = todo.description || "";
        });
        document.getElementById('confirm-description-change-btn').addEventListener('click', () => {
            const newDescription = document.getElementById('edit-description-input').value;
            todo.description = newDescription;
            Storage.saveProjects(projects);
            document.getElementById('todo-description').innerText = newDescription || "No description";
            document.getElementById('edit-description-container').style.display = 'none';
        });

        document.getElementById('edit-dueDate-btn').addEventListener('click', () => {
            document.getElementById('edit-dueDate-container').style.display = 'block';
            document.getElementById('edit-dueDate-input').value = todo.dueDate || "";
        });
        document.getElementById('confirm-dueDate-change-btn').addEventListener('click', () => {
            const newDueDate = document.getElementById('edit-dueDate-input').value;
            todo.dueDate = newDueDate;
            Storage.saveProjects(projects);
            document.getElementById('todo-dueDate').innerText = format(new Date(newDueDate), 'MM/dd/yyyy');
            document.getElementById('edit-dueDate-container').style.display = 'none';
        });

        document.getElementById('edit-priority-btn').addEventListener('click', () => {
            document.getElementById('edit-priority-container').style.display = 'block';
            document.getElementById('edit-priority-input').value = todo.priority || "Low"; 
        });
        document.getElementById('confirm-priority-change-btn').addEventListener('click', () => {
            const newPriority = document.getElementById('edit-priority-input').value;
            todo.priority = newPriority;
            Storage.saveProjects(projects);
            document.getElementById('todo-priority').innerText = newPriority;
            document.getElementById('edit-priority-container').style.display = 'none';
        });
    }    
};

export default UI;
