import {boardContainer, renderCards} from './modules/_board';
import renderFilter from './modules/_filter';

renderCards();
renderFilter();

// SORT BOARD WITHIN FILTER
// Filter Elements
const renderedFilters = document.querySelectorAll(`.filter__label`);
// Clean Board And Render New Cards
Array.from(renderedFilters).forEach((renderedFiltersElement) => {
  renderedFiltersElement.addEventListener(`click`, function () {
    boardContainer.innerHTML = ``;
    renderCards();
  });
});
