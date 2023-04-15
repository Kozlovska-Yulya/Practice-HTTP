import { checkboxClick } from './checkbox.js';

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

export const handleListClicks = (e) => {
  const isCheckbox = e.target.classList.contains('list-item__checkbox');

  if (isCheckbox) {
    checkboxClick(e);
    return;
  }

  const isDeleteBtn = e.target.classList.contains('list-item__delete-btn');

  if (isDeleteBtn) {
    clickOnDeleteBtn(e);
  }
};
