import { checkboxClick } from './checkbox.js';
import { createNewTasks } from './createNewTasks.js';
import { renderTasks } from './render.js';
import { setItem } from './storage.js';
import { deleteTask, getTasksList } from './tasksGateway.js';

export const clickOnDeleteBtn = (e) => {
  const isDeleteBtn = e.target.classList.contains('.list-item__delete-btn');

  if (!isDeleteBtn) {
    return;
  }

  const taskId = e.target.closest('.list-item').dataset.id;
  const tasksList = getItem('tasksList');
  const { text, createDate } = tasksList.find((task) => task.id === taskId);
  const done = event.target.checked;

  const updatedTask = {
    text,
    createDate,
    done,
    finishDate: done ? new Date().toISOString() : null,
  };

  deleteTask(taskId, updatedTask)
    .then(getTasksList)
    .then((newTasksList) => {
      setItem('tasksList', newTasksList);
      renderTasks();
    });
};

// export function checkboxClick(event) {
//   const isCheckbox = event.target.classList.contains('list-item__checkbox');
//   if (!isCheckbox) {

//     return;
//   }

//   const taskId = event.target.dataset.id;
//   const tasksList = getItem('tasksList');
//   const { text, createDate } = tasksList.find((task) => task.id === taskId);
//   const done = event.target.checked;

//   const updatedTask = {
//     text,
//     createDate,
//     done,
//     finishDate: done ? new Date().toISOString() : null,
//   };

const handleListClicks = (e) => {
  const isCheckbox = e.target.classList.contains('list-item__checkbox');

  if (isCheckbox) {
    checkboxClick(e);
    return;
  }

  const isDeleteBtn = e.target.classList.contains('list-item__delete-btn');

  if (isDeleteBtn) {
    deleteTask(e);
  }
};

const todoListElem = document.querySelector('.list');
todoListElem.addEventListener('click', handleListClicks);
