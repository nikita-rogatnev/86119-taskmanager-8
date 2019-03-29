import {Component} from '../../component';
import getRandomNumber from '../../helpers/get-random-number';

export class Filter extends Component {
  constructor(data) {
    super();
    this._name = data;
    this._state = {
      _isDisabled: false,
      _isChecked: false,
    };
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
    <div>
      <input type="radio" id="filter__${this._name.toLowerCase()}" class="filter__input visually-hidden" name="filter"}>
      <label for="filter__${this._name.toLowerCase()}" class="filter__label">
        ${this._name}
        <span class="filter__${this._name.toLowerCase()}-count">${getRandomNumber(1, 100)}</span>
      </label>
    </div>`.trim();
  }
}
