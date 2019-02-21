"use strict";

// DATA
const dataList = {
  filters: [
    {
      filterName: `All`,
      filterAmount: 15,
      filterIsChecked: true
    },
    {
      filterName: `Overdue`,
      filterAmount: 0,
      filterIsDisabled: true
    },
    {
      filterName: `Today`,
      filterAmount: 0,
      filterIsDisabled: true
    },
    {
      filterName: `Favorites`,
      filterAmount: 7
    },
    {
      filterName: `Repeating`,
      filterAmount: 2
    },
    {
      filterName: `Tags`,
      filterAmount: 6
    },
    {
      filterName: `Archive`,
      filterAmount: 115
    }
  ],
  cards: [
    {
      cardText: `It is example of repeating task. It marks by wave.`,
      cardImage: `img/sample-img.jpg`,
      cardDeadline: {
        date: `23 September`,
        time: `11:15 PM`
      },
      cardRepeat: `No`,
      cardHashtag: `#repeat`,
      cardColor: `black`
    },
    {
      cardText: `It is example of repeating task. It marks by wave.`,
      cardImage: `img/sample-img.jpg`,
      cardDeadline: {
        date: `23 September`,
        time: `11:15 PM`
      },
      cardRepeat: `No`,
      cardHashtag: `#repeat`,
      cardColor: `yellow`
    },
    {
      cardText: `It is example of repeating task. It marks by wave.`,
      cardImage: `img/sample-img.jpg`,
      cardDeadline: {
        date: `23 September`,
        time: `11:15 PM`
      },
      cardRepeat: `No`,
      cardHashtag: `#repeat`,
      cardColor: `blue`
    },
    {
      cardText: `It is example of repeating task. It marks by wave.`,
      cardImage: `img/sample-img.jpg`,
      cardDeadline: {
        date: `23 September`,
        time: `11:15 PM`
      },
      cardRepeat: `No`,
      cardHashtag: `#repeat`,
      cardColor: `green`
    },
    {
      cardText: `It is example of repeating task. It marks by wave.`,
      cardImage: `img/sample-img.jpg`,
      cardDeadline: {
        date: `23 September`,
        time: `11:15 PM`
      },
      cardRepeat: `No`,
      cardHashtag: `#repeat`,
      cardColor: `pink`
    },
    {
      cardText: `It is example of repeating task. It marks by wave.`,
      cardImage: `img/sample-img.jpg`,
      cardDeadline: {
        date: `23 September`,
        time: `11:15 PM`
      },
      cardRepeat: `No`,
      cardHashtag: `#repeat`,
      cardColor: `pink`
    },
    {
      cardText: `It is example of repeating task. It marks by wave.`,
      cardImage: `img/sample-img.jpg`,
      cardDeadline: {
        date: `23 September`,
        time: `11:15 PM`
      },
      cardRepeat: `No`,
      cardHashtag: `#repeat`,
      cardColor: `pink`
    }
  ]
};

// FILTER
const filterContainer = document.querySelector(`.main__filter`);
// Filter Template
const getFilterElement = dataList.filters.map((filterElement) => {
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
renderFilter();

// BOARD WITH CARDS
const boardContainer = document.querySelector(`.board__tasks`);
// Card Template
const getCardElement = dataList.cards.map((cardElement) => {
  return `
    <article class="card card--${cardElement.cardColor} card--repeat">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites card__btn--disabled"
              >
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${cardElement.cardText}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">no</span>
                  </button>

                  <fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                        value="${cardElement.cardDeadline.date}"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                        value="${cardElement.cardDeadline.time}"
                      />
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${cardElement.cardRepeat}</span>
                  </button>

                  <fieldset class="card__repeat-days">
                    <div class="card__repeat-days-inner">
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-mo-6"
                        name="repeat"
                        value="mo"
                      />
                      <label class="card__repeat-day" for="repeat-mo-6"
                      >mo</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-tu-6"
                        name="repeat"
                        value="tu"
                        checked
                      />
                      <label class="card__repeat-day" for="repeat-tu-6"
                      >tu</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-we-6"
                        name="repeat"
                        value="we"
                      />
                      <label class="card__repeat-day" for="repeat-we-6"
                      >we</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-th-6"
                        name="repeat"
                        value="th"
                      />
                      <label class="card__repeat-day" for="repeat-th-6"
                      >th</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-fr-6"
                        name="repeat"
                        value="fr"
                        checked
                      />
                      <label class="card__repeat-day" for="repeat-fr-6"
                      >fr</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        name="repeat"
                        value="sa"
                        id="repeat-sa-6"
                      />
                      <label class="card__repeat-day" for="repeat-sa-6"
                      >sa</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-su-6"
                        name="repeat"
                        value="su"
                        checked
                      />
                      <label class="card__repeat-day" for="repeat-su-6"
                      >su</label
                      >
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                        <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="repeat"
                            class="card__hashtag-hidden-input"
                          />
                          <button type="button" class="card__hashtag-name">
                            #repeat
                          </button>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>

                    <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="repeat"
                            class="card__hashtag-hidden-input"
                          />
                          <button type="button" class="card__hashtag-name">
                            #cinema
                          </button>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>

                    <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="repeat"
                            class="card__hashtag-hidden-input"
                          />
                          <button type="button" class="card__hashtag-name">
                            #entertaiment
                          </button>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>
                  </div>

                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>

              <label class="card__img-wrap">
                <input
                  type="file"
                  class="card__img-input visually-hidden"
                  name="img"
                />
                <img
                  src="${cardElement.cardImage}"
                  alt="task picture"
                  class="card__img"
                />
              </label>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  <input
                    type="radio"
                    id="color-black-6"
                    class="card__color-input card__color-input--black visually-hidden"
                    name="color"
                    value="black"
                  />
                  <label
                    for="color-black-6"
                    class="card__color card__color--black"
                  >black</label
                  >
                  <input
                    type="radio"
                    id="color-yellow-6"
                    class="card__color-input card__color-input--yellow visually-hidden"
                    name="color"
                    value="yellow"
                  />
                  <label
                    for="color-yellow-6"
                    class="card__color card__color--yellow"
                  >yellow</label
                  >
                  <input
                    type="radio"
                    id="color-blue-6"
                    class="card__color-input card__color-input--blue visually-hidden"
                    name="color"
                    value="blue"
                  />
                  <label
                    for="color-blue-6"
                    class="card__color card__color--blue"
                  >blue</label
                  >
                  <input
                    type="radio"
                    id="color-green-6"
                    class="card__color-input card__color-input--green visually-hidden"
                    name="color"
                    value="green"
                    checked
                  />
                  <label
                    for="color-green-6"
                    class="card__color card__color--green"
                  >green</label
                  >
                  <input
                    type="radio"
                    id="color-pink-6"
                    class="card__color-input card__color-input--pink visually-hidden"
                    name="color"
                    value="pink"
                  />
                  <label
                    for="color-pink-6"
                    class="card__color card__color--pink"
                  >pink</label
                  >
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
  `;
});
// Render Cards
const renderCards = () => {
  return boardContainer.insertAdjacentHTML(`beforeend`, getCardElement.join(``));
};
renderCards();

// SORT BOARD WITHIN FILTER
// Filter Elements
const renderedFilters = document.querySelectorAll(`.filter__label`);
// Clean Board And Render New Cards
Array.from(renderedFilters).forEach((renderedFiltersElement) => {
  renderedFiltersElement.addEventListener(`click`, function () {
    console.log(`click`);
    boardContainer.innerHTML = ``;
    renderCards(Math.floor(Math.random() * 7) + 1);
  });
});
