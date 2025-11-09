const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
  // --- Launch the Electron app ---
  const electronApp = await electron.launch({ args: ['.'] });
  const window = await electronApp.firstWindow();

  const taskText = 'My new E2E test task';

  // --- Task 1: Add a new todo item ---
  const input = window.locator('#todo-input');   // 1. Tìm ô input
  await input.fill(taskText);                    // 2. Gõ nội dung task
  const addButton = window.locator('#add-todo-btn'); // 3. Tìm nút Add
  await addButton.click();                       // 4. Nhấn Add

  // --- Task 2: Verify the todo item was added ---
  const todoItem = window.locator(`#todo-list li:has-text("${taskText}")`);
  await expect(todoItem).toBeVisible();          // 5. Kiểm tra task xuất hiện trong danh sách

  // --- Task 3: Mark the todo item as complete ---
  const checkbox = todoItem.locator('input[type="checkbox"]');
  await checkbox.check();                        // 6. Tick vào checkbox
  await expect(todoItem).toHaveClass(/completed/); // 7. Kiểm tra class 'completed' được thêm

  // --- Task 4: Delete the todo item ---
  const deleteButton = todoItem.locator('button.delete-btn');
  await deleteButton.click();                    // 8. Nhấn nút delete
  await expect(todoItem).not.toBeVisible();      // 9. Kiểm tra task bị xóa khỏi danh sách

  // --- Close the app ---
  await electronApp.close();
});
