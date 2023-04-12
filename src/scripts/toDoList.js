import { createNewTasks } from './createNewTasks.js';
import { checkboxClick } from './checkbox.js';
import { clickOnDeleteBtn, handleListClicks } from './deleteTask.js';

export const initTodoListHandlers = () => {
  const createBtnElem = document.querySelector('.create-task-btn');
  createBtnElem.addEventListener('click', createNewTasks);

  const listElem = document.querySelector('.list');
  listElem.addEventListener('click', checkboxClick);

  const deleteTaskElem = document.querySelector('.list');
  deleteTaskElem.addEventListener('click', clickOnDeleteBtn);

  const todoListElem = document.querySelector('.list');
  todoListElem.addEventListener('click', handleListClicks);
};
