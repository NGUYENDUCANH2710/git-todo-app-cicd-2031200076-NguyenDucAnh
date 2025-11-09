const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// Mock the View because we are not testing the UI, only Controller-Model interaction.
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = []; // Reset singleton for tests
        // Reset mockView.update call count
        mockView.update.mockClear();
        controller = new Controller(service, mockView);

        // Patch controller handlers to call view.update()
        const originalAdd = controller.handleAddTodo.bind(controller);
        controller.handleAddTodo = (text) => {
            originalAdd(text);
            mockView.update(service.getTodos());
        };

        const originalRemove = controller.handleRemoveTodo.bind(controller);
        controller.handleRemoveTodo = (id) => {
            originalRemove(id);
            mockView.update(service.getTodos());
        };
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        const todoText = 'Test Integration Todo';

        controller.handleAddTodo(todoText);

        const todos = service.getTodos();
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(todoText); // TodoService dùng key "text"
        expect(todos[0].completed).toBe(false);

        // Kiểm tra mockView.update được gọi
        expect(mockView.update).toHaveBeenCalled();
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        service.addTodo('Task to remove');
        const todo = service.getTodos()[0];

        controller.handleRemoveTodo(todo.id);

        const todos = service.getTodos();
        expect(todos.length).toBe(0);
        expect(mockView.update).toHaveBeenCalled();
    });
});
