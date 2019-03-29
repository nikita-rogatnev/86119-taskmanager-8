import Component from '../../component';
import createElement from '../../helpers/create-element';

export default class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._id = data.id;
    this._count = data.count;
    this._checked = data.checked;

    this._onFilter = this._onFilter.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilter(evt) {
    evt.preventDefault();

    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  get template() {
    return `
      <div>
        <input
          type="radio"
          id="filter__${this._id}"
          class="filter__input visually-hidden"
          name="filter"
          ${this._checked ? `checked` : ``}/>
        <label for="filter__${this.title}" class="filter__label">
          ${this._name}
          <span class="filter__${this._id}-count">{this._count}</span>
        </label>
      </div>`;
  }

  updateCount(newCount) {
    this._element.querySelector(`.filter__${this._id}-count`).innerHTML = newCount;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {
    // this._element.querySelector(`.filter__input`)
    //   .addEventListener(`change`, this._onFilter);
  }

  unbind() {
    this._element.querySelector(`.filter__input`)
      .removeEventListener(`change`, this._onFilter);
  }
}
