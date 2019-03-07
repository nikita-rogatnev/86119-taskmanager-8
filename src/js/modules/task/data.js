import {getRandomNumber} from '../filter/data';

export const taskList = {
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  get dueDate() {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + getRandomNumber(-7, 7));

    return dueDate.toLocaleDateString(`en-GB`, {
      day: `numeric`,
      month: `long`
    });
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]),
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ],
  repeatingDays: {
    'mo': true,
    'tu': false,
    'we': true,
    'th': false,
    'fr': false,
    'sa': true,
    'su': false,
  },
  isFavorite: true,
  isDone: false
};
