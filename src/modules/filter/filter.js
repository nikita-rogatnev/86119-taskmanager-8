export const filter = (label, count = 0) => `
    <input type="radio" id="filter__${label}" class="filter__input visually-hidden" name="filter" ${count === 0 ? `disabled` : ``} ${label === `all` && count !== 0 ? `checked` : ``} />
    <label for="filter__${label}" class="filter__label">${label} <span class="filter__${label}-count">${count}</span></label>`;
