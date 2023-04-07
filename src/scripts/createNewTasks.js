import { renderTasks } from './render.js';
import { getItem, setItem } from './storage.js';
import { createTask, getTasksList } from './tasksGateway.js';

export function createNewTasks() {
  const inputElem = document.querySelector('.task-input');
  const valueInputElem = inputElem.value;
  if (!valueInputElem) {
    return;
  }
  inputElem.value = '';

  const newTask = {
    text: valueInputElem,
    done: false,
  };

  createTask(newTask)
    .then(() => getTasksList())
    .then((newTasksList) => {
      setItem('tasksList', newTasksList);
      renderTasks();
    });
}
