import * as dataFilters from '../data/filters.json';

// FILTER
const filterContainer = document.querySelector(`.main__filter`);
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
const renderFilter = () => {
  return filterContainer.insertAdjacentHTML(`beforeend`, getFilterElement.join(``));
};

export default renderFilter;
