const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        service = new TodoService();
        service.todos = [];
    });

    test('should add a new todo', () => {
        const text = "Learn Testing";
        service.addTodo(text);

        expect(service.todos.length).toBe(1);
        expect(service.todos[0].text).toBe(text);
        expect(service.todos[0].completed).toBe(false);
    });

    test('should toggle the completed state of a todo', () => {
        service.addTodo("Learn Jest");
        const id = service.todos[0].id;

        service.toggleTodoComplete(id);
        expect(service.todos[0].completed).toBe(true);

        service.toggleTodoComplete(id);
        expect(service.todos[0].completed).toBe(false);
    });

    test('should remove a todo', () => {
        service.addTodo("Task");
        const id = service.todos[0].id;

        service.removeTodo(id);
        expect(service.todos.length).toBe(0);
    });

    test('should not add a todo if text is empty', () => {
        service.addTodo("");
        expect(service.todos.length).toBe(0);
    });
});
