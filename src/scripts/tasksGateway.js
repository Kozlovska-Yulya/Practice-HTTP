const baseUrl =
  'https://crudcrud.com/api/4ad76f79f02c4c92ac09110acad1eeba/tasks';

const mapTasks = (tasks) => {
  tasks.map(({ _id, ...rest }) => ({ ...rest, id: _id }));
};

export const getTasksList = () => {
  return fetch(baseUrl)
    .then((response) => response.json())
    .then((tasks) => mapTasks(tasks));
};

export const createTask = (taskData) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(taskData),
  });
};

export const updateTask = (taskId, updatedTaskData) => {
  return fetch(`${baseUrl}/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(updatedTaskData),
  });
};
