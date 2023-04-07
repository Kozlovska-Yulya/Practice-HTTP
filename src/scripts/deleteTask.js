import { renderTasks } from './render.js';
import { setItem } from './storage.js';
import { deleteTask, getTasksList } from './tasksGateway.js';

export const clickOnDeleteBtn = (e) => {
  const taskId = e.target.closest('.list-item').dataset.id;

  deleteTask(taskId)
    .then(getTasksList)
    .then((newTasksList) => {
      setItem('tasksList', newTasksList);

      renderTasks();
    });
};
