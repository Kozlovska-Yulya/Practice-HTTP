import { setItem, getItem } from './storage.js';
import { createTask, getTasksList } from './tasksGateway.js';
import { updateTask } from './tasksGateway.js';

const tasks = [
  { id: 'first-task', text: 'Buy milk', done: false },
  { id: 'second-task', text: 'Pick up Tom from airport', done: false },
  { id: 'third-task', text: 'Visit party', done: false },
  { id: 'fourth-task', text: 'Visit doctor', done: true },
  { id: 'fifth-task', text: 'Buy meat', done: true },
];

const listElem = document.querySelector('.list');

const renderTasks = () => {
  const getTasksList = getItem('tasksList') || [];

  listElem.innerHTML = '';
  const tasksElems = getTasksList
    .sort((a, b) => a.done - b.done)
    .map(({ text, done, id }) => {
      const listItemElem = document.createElement('li');
      listItemElem.classList.add('list__item');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('data-id', id);
      checkbox.checked = done;
      checkbox.classList.add('list__item-checkbox');
      if (done) {
        listItemElem.classList.add('list__item_done');
      }
      listItemElem.append(checkbox, text);

      return listItemElem;
    });

  listElem.append(...tasksElems);
};

renderTasks(tasks);

//////

const createBtnElem = document.querySelector('.create-task-btn');

function haveValue() {
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

function checkboxClick(event) {
  const isCheckbox = event.target.classList.contains('list__item-checkbox');
  if (!isCheckbox) {
    return;
  }

  // const taskId = event.target.dataset.id;
  const tasksList = getItem('tasksList');
  // const { text, createDate } = tasksList.find((task) => task.id === taskId);
  // const done = event.target.checked;

  // const updatedTask = {
  //   text,
  //   createDate,
  //   done,
  //   finishDate: done ? new Date().toISOString() : null,
  // };

  // updateTask(taskId, updatedTask)
  //   .then(() => getTasksList())
  //   .then((newTasksList) => {
  //     setItem('tasksList', newTasksList);
  //     renderTasks();
  //   });
}

createBtnElem.addEventListener('click', haveValue);
listElem.addEventListener('click', checkboxClick);

document.addEventListener('DOMContentLoaded', () => {
  getTasksList().then((tasksList) => {
    setItem('tasksList', tasksList);
    renderTasks();
  });
});

const onStorageChange = (e) => {
  if (e.key === 'tasksList') {
    renderTasks();
  }
};

window.addEventListener('storage', onStorageChange);
