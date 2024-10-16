import Project from './project.js';
import Todo from './todo.js';

const Storage = {
    saveProjects(projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
    },

    loadProjects() {
        const projects = localStorage.getItem('projects');
        if (!projects) return [];
    
        try {
            const parsedProjects = JSON.parse(projects);
            return parsedProjects.map(projData => {
                const project = new Project(projData.name);
                project.todos = projData.todos.map(todoData => 
                    new Todo(todoData.title, todoData.description, todoData.dueDate, todoData.priority)
                );
                return project;
            });
        } catch (error) {
            console.error('Error parsing projects from localStorage:', error);
            return [];
        }
    }
};

export default Storage;
