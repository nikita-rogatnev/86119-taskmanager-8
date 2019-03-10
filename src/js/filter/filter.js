import * as dataFilters from './filters.json';

// Filter Template
const getFilterElement = dataFilters.filters.map((filterElement) => {
  return `
    <input
      type="radio"
      id="filter__${filterElement.filterName.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      ${filterElement.filterIsChecked ? `checked` : ``}
	    ${filterElement.filterIsDisabled ? `disabled` : ``}
    />
    <label for="filter__${filterElement.filterName.toLowerCase()}" class="filter__label">
      ${filterElement.filterName} <span class="filter__all-count">${filterElement.filterAmount}</span>
    </label>
  `;
});

// Render Filters
export const renderFilter = () => {
  return document.querySelector(`.main__filter`).insertAdjacentHTML(`beforeend`, getFilterElement.join(``));
};
