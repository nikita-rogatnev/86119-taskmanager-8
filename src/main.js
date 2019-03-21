import getRandomNumber from './helpers/get-random-number';

import {filter} from './modules/filter/filter';

import taskList from './modules/task/data';
import {Task} from './modules/task/task';
import {TaskEdit} from './modules/task/task-edit';

// Variables
const filtersContainer = document.querySelector(`.main__filter`);
const filterItems = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const TASKS_COUNT = 12;
const tasksContainer = document.querySelector(`.board__tasks`);
const taskItems = new Array(TASKS_COUNT).fill(``).map(() => taskList());

// Application
const app = {
  _updateTask(tasks, i, data) {
    tasks[i] = Object.assign({}, tasks[i], data);
    return tasks[i];
  },

  _deleteTask(tasks, i) {
    tasks.splice(i, 1);
    return tasks;
  },

  // Render Filters
  renderFilters(labels) {
    const filters = labels.map((label) => filter(label, getRandomNumber(0, 12)));

    if (filters && filters.length) {
      filtersContainer.insertAdjacentHTML(`beforeend`, labels.map((label) =>
        filter(label, getRandomNumber(0, 12))).join(``));
    }
  },

  // Render Tasks
  renderTasks(tasks, container) {
    container.textContent = ``;

    tasks.forEach((task, i) => {
      const taskComponent = new Task(task);
      const taskEditComponent = new TaskEdit(task);

      taskComponent.onEdit = () => {
        taskEditComponent.render();
        tasksContainer.replaceChild(taskEditComponent.element, taskComponent.element);
        taskComponent.unrender();
      };

      taskEditComponent.onSubmit = (data) => {
        const taskData = this._updateTask(tasks, i, data);

        taskComponent.update(taskData);
        taskComponent.render();
        tasksContainer.replaceChild(taskComponent.element, taskEditComponent.element);
        taskEditComponent.unrender();
      };

      taskEditComponent.onDelete = () => {
        this._deleteTask(tasks, i);
        taskEditComponent.unrender();
      };

      container.appendChild(taskComponent.render());
    });
  },

  render() {
    this.renderFilters(filterItems);
    this.renderTasks(taskItems, tasksContainer);
  }
};

app.render();
