import Component from '../../component';
import Color from './color';

import moment from 'moment';

export default class Task extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;

    this._isFavorite = false;
    this._isDone = false;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._onEdit = null;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
    <article class="card ${Color[this._color]} ${this._isRepeated() ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive">archive</button>
            <button type="button" class="card__btn card__btn--favorites card__btn--disabled">favorites</button>
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <label>
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
            </label>
           </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                ${moment(this._dueDate).format(`DD MMMM HH:mm`)}
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${(Array.from(this._tags).map((tag) => (`
                  <span class="card__hashtag-inner">
                    <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input" />
                    <button type="button" class="card__hashtag-name">#${tag}</button>
                    <button type="button" class="card__hashtag-delete">delete</button>
                  </span>`.trim()))).join(``)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;

    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;
  }
}
