import { TodoList } from "./TodoList.js";

document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    const todoListEl = document.getElementById('todo-list');
    const todoList = new TodoList(todoListEl);

    const addTodoButtonEl = document.getElementById('add-todo-btn');
    addTodoButtonEl.addEventListener('click', () => {
        todoList.addItem();
    });
}
