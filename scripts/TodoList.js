import { Todo } from "./Todo.js";
import { TodoListItem } from "./TodoListItem.js";

export class TodoList {

    constructor(listEl) {
        this._listEl = listEl;
        this._items = [];
        this._load();
    }

    _load() {
        const value = window.localStorage.getItem('todo_list');
        if (!value) return;

        const todoDataList = JSON.parse(value);

        todoDataList.forEach((todoData) => {
            const todo = new Todo(todoData);
            const todoItem = this._createTodoListItem(todo);
            this._listEl.prepend(todoItem.element);
            this._items.push(todoItem);
        });
    }

    _save() {
        const data = JSON.stringify(this._items.map(item => item.todo));
        window.localStorage.setItem('todo_list', data);
    }

    _createTodoListItem(todo) {
        const todoItem = new TodoListItem(todo);
        todoItem.addEventListener('click:delete', () => {
            this.deleteItem(todoItem.id);
        });
        todoItem.addEventListener('update:todo', () => {
            this._save();
        });
        return todoItem;
    }

    addItem(content) {
        const todo = new Todo({ content });
        const todoItem = this._createTodoListItem(todo);

        this._listEl.prepend(todoItem.element);
        this._items.push(todoItem);

        this._save();
        todoItem.enableEdit();

        return todoItem.id;
    }

    deleteItem(id) {
        this._items = this._items.filter(item => {
            if (item.id !== id) return true;
            item.remove();
            return false;
        });
        this._save();
    }

    clearItems() {
        this._items.forEach(item => item.element.remove());
        this._items = [];
        this._save();
    }
}
