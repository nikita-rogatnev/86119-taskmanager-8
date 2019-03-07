import {taskList} from './modules/task/data';
import {Task} from './modules/task/task';
import {TaskEdit} from './modules/task/task-edit';

import {renderFilter} from './modules/filter/filter';

// Render Filter
renderFilter();

// Render Tasks
const tasksContainer = document.querySelector(`.board__tasks`);
const taskComponent = new Task(taskList);
const editTaskComponent = new TaskEdit(taskList);

tasksContainer.appendChild(taskComponent.render());

taskComponent.onEdit = () => {
  editTaskComponent.render();
  tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
  taskComponent.unrender();
};

editTaskComponent.onSubmit = () => {
  taskComponent.render();
  tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
  editTaskComponent.unrender();
}
