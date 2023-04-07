import { setItem } from './storage.js';
import { getTasksList } from './tasksGateway.js';
import { renderTasks } from './render.js';
import { initTodoListHandlers } from './toDoList.js';

document.addEventListener('DOMContentLoaded', () => {
  getTasksList().then((tasksList) => {
    setItem('tasksList', tasksList);
    renderTasks();
  });
  initTodoListHandlers();
});

const onStorageChange = (e) => {
  if (e.key === 'tasksList') {
    renderTasks();
  }
};

window.addEventListener('storage', onStorageChange);
