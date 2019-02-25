import {renderCards} from './modules/board';
import {renderFilter} from './modules/filter';

renderCards();
renderFilter();

// SORT BOARD WITHIN FILTER
// Filter Elements
const renderedFilters = document.querySelectorAll(`.filter__label`);
// Clean Board And Render New Cards
Array.from(renderedFilters).forEach((renderedFiltersElement) => {
  renderedFiltersElement.addEventListener(`click`, function () {
    document.querySelector(`.board__tasks`).innerHTML = ``;
    renderCards();
  });
});
