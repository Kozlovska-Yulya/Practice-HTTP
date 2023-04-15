import { renderTasks } from './render.js';
import { setItem, getItem } from './storage.js';
import { getTasksList, updateTask } from './tasksGateway.js';

export function checkboxClick(event) {
  const taskId = event.target.closest('.list-item').dataset.id;
  const tasksList = getItem('tasksList');
  const { text, createDate } = tasksList.find((task) => task.id === taskId);
  const done = event.target.checked;

  const updatedTask = {
    text,
    createDate,
    done,
    finishDate: done ? new Date().toISOString() : null,
  };

  updateTask(taskId, updatedTask)
    .then(() => getTasksList())
    .then((newTasksList) => {
      setItem('tasksList', newTasksList);
      renderTasks();
    });
}
