import { getItem } from './storage.js';

const listElem = document.querySelector('.list');

export const renderTasks = () => {
  const getTasksList = getItem('tasksList') || [];

  listElem.innerHTML = '';
  const tasksElems = getTasksList
    .sort((a, b) => a.done - b.done)
    .map(({ text, done, id }) => {
      const listItemElem = document.createElement('li');
      listItemElem.classList.add('list-item', 'list__item');
      listItemElem.classList.add('list-item');
      listItemElem.setAttribute('data-id', id);
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.checked = done;
      checkbox.classList.add('list-item__checkbox');
      if (done) {
        listItemElem.classList.add('list-item_done');
      }

      const textElem = document.createElement('span');
      textElem.classList.add('list-item__text');
      textElem.textContent = text;

      const deleteBtnElem = document.createElement('button');
      deleteBtnElem.classList.add('list-item__delete-btn');
      listItemElem.append(checkbox, textElem, deleteBtnElem);

      return listItemElem;
    });

  listElem.append(...tasksElems);
};
