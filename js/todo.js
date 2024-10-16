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

    update(fields) {
        Object.keys(fields).forEach(key => {
            if (fields[key] !== undefined) {
                this[key] = fields[key];
            }
        });
    }
}

export default Todo;
