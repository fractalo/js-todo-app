import { TodoList } from "./TodoList.js";
import { Indicator } from "./Indicator.js";

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

    const doneIndicatorEl = document.getElementById('indicator-done');
    const doneIndicator = new Indicator(doneIndicatorEl);
    
    todoList.addEventListener('save', () => {
        doneIndicator.indicate(1500);
    });
}
