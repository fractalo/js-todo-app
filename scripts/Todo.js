import { generateId } from './utils.js';

export class Todo {
    constructor(config) {
        this.id = config.id ?? generateId();
        this.content = config.content ?? '';
        this.isComplete = config.isComplete ?? false;
    }
}
