class Todo {
    constructor(title, description, dueDate, priority, checklist = [], notes = "") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checklist = checklist;
        this.notes = notes;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

export default Todo;
