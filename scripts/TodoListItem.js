import { CLASSNAMES } from "./constants.js";
import { createMeterialIconEl } from './utils.js';
import { EventEmitter } from './EventEmitter.js';

export class TodoListItem extends EventEmitter {

    constructor(todo) {
        super();
        this.todo = todo;
        this._todoEl = this._createTodoElement();
        this._checkboxEl = this._createCheckboxElement();
        this._textEl = this._createTextElement();
        const actionsEl = this._createActionsElement();

        this._todoEl.append(
            this._checkboxEl,
            this._textEl,
            actionsEl,
        );
    }

    get id() {
        return this.todo.id;
    }

    get element() {
        return this._todoEl;
    }

    remove() {
        this._todoEl.remove();
    }

    enableEdit() {
        this._textEl.disabled = false;
        this._textEl.focus();
    }

    _createTodoElement() {
        const todoEl = document.createElement('div');
        todoEl.classList.add('todo-item');
        this.todo.isComplete && todoEl.classList.add(CLASSNAMES.TODO_COMPLETE);
        return todoEl;
    }

    _createCheckboxElement() {
        const checkboxEl = document.createElement('input');
        checkboxEl.setAttribute('type', 'checkbox');
        checkboxEl.checked = this.todo.isComplete;
        checkboxEl.addEventListener('change', () => {
            this.todo.isComplete = checkboxEl.checked;
            this._emit('update:todo');
            if (this.todo.isComplete) {
                this._todoEl.classList.add(CLASSNAMES.TODO_COMPLETE);
            } else {
                this._todoEl.classList.remove(CLASSNAMES.TODO_COMPLETE);
            }
        });
        return checkboxEl;
    }

    _createTextElement() {
        const textEl = document.createElement('input');
        textEl.classList.add('todo-content');
        textEl.setAttribute('type', 'text');
        textEl.value = this.todo.content;
        textEl.disabled = true;
        textEl.addEventListener('change', () => {
            this.todo.content = textEl.value;
            this._emit('update:todo');
        });
        textEl.addEventListener('focusout', () => {
            textEl.disabled = true;
        });
        textEl.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                textEl.blur();
            }
        });
        return textEl;
    }

    _createActionsElement() {
        const actionsEl = document.createElement('div');
        actionsEl.classList.add('todo-item-actions');

        const editButtonEl = document.createElement('button');
        editButtonEl.classList.add('btn', 'btn-sm', 'btn-circle');
        editButtonEl.append(createMeterialIconEl('edit'));
        editButtonEl.addEventListener('click', () => {
            this.enableEdit();
        });

        const deleteButtonEl = document.createElement('button');
        deleteButtonEl.classList.add('btn', 'btn-sm', 'btn-circle');
        deleteButtonEl.append(createMeterialIconEl('delete'));
        deleteButtonEl.addEventListener('click', () => {
            this._emit('click:delete');
        });

        actionsEl.append(
            editButtonEl,
            deleteButtonEl,
        );
        
        return actionsEl;
    }
}