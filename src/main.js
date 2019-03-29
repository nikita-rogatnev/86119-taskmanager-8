import moment from 'moment';

import {Filter} from './modules/filter/filter';

import taskList from './modules/task/data';
import {Task} from './modules/task/task';
import {TaskEdit} from './modules/task/task-edit';

// Navigation
const tabTasks = document.querySelector(`label[for="control__task"]`);
const tabStatistics = document.querySelector(`label[for="control__statistic"]`);

const containerTasks = document.querySelector(`.board`);
const containerStatistics = document.querySelector(`.statistic`);
const containerFilters = document.querySelector(`.main__filter`);

const onClickTabTasks = () => {
  containerTasks.classList.remove(`visually-hidden`);
  containerFilters.classList.remove(`visually-hidden`);
  containerStatistics.classList.add(`visually-hidden`);
};

const onClickTabStatistics = () => {
  containerTasks.classList.add(`visually-hidden`);
  containerFilters.classList.add(`visually-hidden`);
  containerStatistics.classList.remove(`visually-hidden`);
  // renderStatistic();
};

tabTasks.addEventListener(`click`, onClickTabTasks);
tabStatistics.addEventListener(`click`, onClickTabStatistics);

// Tasks
const TASKS_COUNT = 12;
const tasksContainer = document.querySelector(`.board__tasks`);
const taskItems = new Array(TASKS_COUNT).fill(``).map(() => taskList());

const updateTask = (tasks, i, newTask) => {
  tasks[i] = Object.assign({}, tasks[i], newTask);
  return tasks[i];
};

const deleteTask = (tasks, i) => {
  tasks.splice(i, 1);
  return tasks;
};

const renderTasks = (tasks) => {
  tasksContainer.innerHTML = ``;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newObject) => {
      const updatedTask = updateTask(tasks, i, newObject);

      taskComponent.update(updatedTask);
      taskComponent.render();
      tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.onDelete = () => {
      deleteTask(tasks, i);
      editTaskComponent.unrender();
    };

    tasksContainer.appendChild(taskComponent.render());
  }
};

renderTasks(taskItems);

// Filters
const filtersContainer = document.querySelector(`.filter`);
const filterList = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const renderFilters = (filters) => {
  filtersContainer.innerHTML = ``;

  filters.forEach((filterItem) => {
    const filterComponent = new Filter(filterItem);

    filtersContainer.appendChild(filterComponent.render());
  });
};

renderFilters(filterList, filtersContainer);

const filterTasks = (tasks, filterName) => {
  console.log(filterName);

  switch (filterName) {
    case `filter__overdue`:
      return tasks.filter((it) => moment(it.dueDate) < moment());

    case `filter__today`:
      return tasks.filter((it) => moment(it.dueDate).format(`D MMMM`) === moment().format(`D MMMM`));

    case `filter__favorites`:
      return tasks.filter((it) => it.isFavorite === true);

    case `filter__repeating`:
      return tasks.filter((it) => [...Object.entries(it.repeatingDays)].some((rec) => rec[1]));

    case `filter__tags`:
      return tasks.filter((it) => [...it.tags].some((rec) => rec[1]));

    case `filter__archive`:
      return tasks.filter((it) => it.isDone === true);

    default:
      return tasks;
  }
};

filtersContainer.onchange = (evt) => {
  const filterName = evt.target.id;
  const filteredTasks = filterTasks(taskList, filterName);
  renderTasks(filteredTasks);
};
