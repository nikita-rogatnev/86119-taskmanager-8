import API from './api';

import moment from 'moment';
// import taskList from './modules/task/data';

import Filter from './modules/filter/filter';
import Task from './modules/task/task';
import TaskEdit from './modules/task/task-edit';

// Variables
const containerFilters = document.querySelector(`.main__filter`);
const containerBoard = document.querySelector(`.board`);
const containerTasks = document.querySelector(`.board__tasks`);
const containerNoTasks = document.querySelector(`.board__no-tasks`);
const containerStatistics = document.querySelector(`.statistic`);

const tabTasks = document.querySelector(`label[for="control__task"]`);
const tabStatistics = document.querySelector(`label[for="control__statistic"]`);

let filters = [];

// API
const AUTHORIZATION = `Basic dXNckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

// Render Filtered Tasks
const filteredTasks = (filterName, tasks) => {
  switch (filterName) {
    case `All`:
      return tasks;

    case `Overdue`:
      return tasks.filter((it) => it.dueDate < Date.now());

    case `Today`:
      return tasks.filter((it) => it.dueDate < Date.now());

    case `Repeating`:
      return tasks.filter((it) => [...Object.entries(it.repeatingDays)]
        .some((rec) => rec[1]));
  }
  return tasks;
};

const updateFilterLabels = (tasks) => {
  filters.forEach((filter) => {
    const newCount = filteredTasks(filter._name, tasks).length;
    if (filter._count !== newCount) {
      filter.updateCount(newCount);
    }
  });
};

// Tasks
const renderTasks = (tasks) => {
  containerTasks.innerHTML = ``;

  for (const task of tasks) {
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);

    containerTasks.appendChild(taskComponent.render());

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      containerTasks.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newObject) => {
      task.title = newObject.title;
      task.dueDate = newObject.dueDate;
      task.tags = newObject.tags;
      task.picture = newObject.picture;
      task.repeatingDays = newObject.repeatingDays;
      task.color = newObject.color;
      task.isFavorite = newObject.isFavorite;
      task.isDone = newObject.isDone;

      editTaskComponent.blockOnSave();

      api.updateTask({id: task.id, data: task.toRAW()})
        .then((response) => {
          if (response) {
            editTaskComponent.unblockOnSave();
            taskComponent.update(response);
            taskComponent.render();
            containerTasks.replaceChild(taskComponent.element, editTaskComponent.element);
            editTaskComponent.unrender();
            updateFilterLabels(tasks);
          }
        })
        .catch(() => editTaskComponent.shake())
        .then(() => editTaskComponent.unblockOnSave())
      ;
    };

    editTaskComponent.onDelete = ({id}) => {
      editTaskComponent.blockOnDelete();
      api.deleteTask({id})
        .then(() => api.getTasks())
        .then((tasksNew) => {
          renderFilters(filterList, tasksNew);
        })
        .catch(() => {
          editTaskComponent.shake();
          editTaskComponent.unblockOnDelete();
        });
    };
  }
};

// Filters
const filterList = [
  {id: 1, name: `All`, count: 5, checked: true},
  {id: 2, name: `Overdue`, count: 2, checked: false},
  {id: 3, name: `Today`, count: 3, checked: false},
  {id: 4, name: `Favorites`, count: 1, checked: false},
  {id: 5, name: `Repeating`, count: 5, checked: false},
  {id: 6, name: `Tags`, count: 1, checked: false},
  {id: 7, name: `Archive`, count: 3, checked: false},
];

const renderFilters = (data, tasks) => {
  filters = [];
  containerFilters.innerHTML = ``;

  data.forEach((filter) => {
    const tasksFilter = filteredTasks(filter.name, tasks);
    filter.count = tasksFilter.length;
    const filterComponent = new Filter(filter);
    filters.push(filterComponent);
    containerFilters.appendChild(filterComponent.render());

    filterComponent.onFilter = () => {
      containerStatistics.classList.add(`visually-hidden`);
      containerTasks.classList.remove(`visually-hidden`);
      updateFilterLabels(tasks);
      renderTasks(filteredTasks(filter.name, tasks));
    };

    if (filterComponent._checked) {
      filterComponent._onFilter();
    }
  });
};

const startLoad = () => {
  containerTasks.classList.add(`visually-hidden`);
  containerNoTasks.classList.remove(`visually-hidden`);
  containerNoTasks.innerHTML = `Loading tasks...`;
};

const errorLoad = () => {
  containerNoTasks.innerHTML = `Something went wrong while loading your tasks. Check your connection or try again later`;
};

const stopLoad = () => {
  containerTasks.classList.remove(`visually-hidden`);
  containerNoTasks.classList.add(`visually-hidden`);
};

startLoad();

api.getTasks()
  .then((tasks) => {
    renderFilters(filterList, tasks);
  })
  .then(stopLoad)
  .catch(errorLoad);

// Navigation
const onClickTabTasks = () => {
  containerBoard.classList.remove(`visually-hidden`);
  containerFilters.classList.remove(`visually-hidden`);
  containerStatistics.classList.add(`visually-hidden`);
};

const onClickTabStatistics = () => {
  containerBoard.classList.add(`visually-hidden`);
  containerFilters.classList.add(`visually-hidden`);
  containerStatistics.classList.remove(`visually-hidden`);
  // renderStatistics();
};

tabTasks.addEventListener(`click`, onClickTabTasks);
tabStatistics.addEventListener(`click`, onClickTabStatistics);
