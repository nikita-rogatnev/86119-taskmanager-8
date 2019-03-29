export default class ModelTask {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`title`] || ``;
    this.dueDate = new Date(data[`due_date`]);
    this.tags = new Set(data[`tags`] || []);
    this.picture = data[`picture`] || ``;
    this.repeatingDays = data[`repeating_days`];
    this.color = data[`color`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.isDone = Boolean(data[`is_done`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'title': this.title,
      'due_date': this.dueDate,
      'tags': [...this.tags.values()],
      'picture': this.picture,
      'repeating_days': this.repeatingDays,
      'color': this.color,
      'is_favorite': this.isFavorite,
      'is_done': this.isDone,
    };
  }

  static parseTask(data) {
    return new ModelTask(data);
  }

  static parseTasks(data) {
    return data.map(ModelTask.parseTask);
  }
}
