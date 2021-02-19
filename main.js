//DOM variables
const comicsSection = document.querySelector(".section-comics");
const charactersSection = document.querySelector(".section-characters");
const typeFilterSelect = document.getElementById("type__filter");
const sortBySelectForComics = document.getElementById("sortby--filter__comics");
const sortBySelectForCharacters = document.getElementById(
  "sortby--filter__characters"
);
const searchButton = document.querySelector(".search__button");
const searchBar = document.getElementById("input__search");
const firstPageButton = document.querySelector(".pages--button__first");
const lastPageButton = document.querySelector(".pages--button__last");
const rightPageButton = document.querySelector(".pages--button__right");
const leftPageButton = document.querySelector(".pages--button__left");

//Other Variables
const baseURL = "https://gateway.marvel.com/v1/public/";
const myApiKey = "09f672ea66d3144befdf6f7fc2796c10";
let type = "comics";
let sort = "title";
const itemsPerPage = 20;
let totalItems = 0;
let currentPage = 0;
let url = ``;

const createURL = (queryParamType, queryParamSort) => {
  queryParamType = type;
  queryParamSort = sort;

  url = `${baseURL + queryParamType}?apikey=${myApiKey}&offset=${
    currentPage * itemsPerPage
  }&orderBy=${queryParamSort}`;
  return url;
};
createURL();

const fetchInfo = (url) => {
  fetch(url)
    .then((data) => data.json())
    .then((info) => {
      totalItems = info.data.total;
      if (type === "comics") {
        createComicsCards(info);
      } else {
        createCharactersCards(info);
      }
      updatePagination();
    });
};
fetchInfo(url);

const createComicsCards = (info) => {
  clearSectionContent(comicsSection);
  clearSectionContent(charactersSection);
  info.data.results.map((comic) => {
    return (comicsSection.innerHTML += `
        <article class="card--container__comic">
          <div class="img--container__comic">
            <img class="img__comic" src="${comic.thumbnail.path}.jpg" />
          </div>
          <h3 class="title__comic">
            ${comic.title}
          </h3>
        </article>`);
  });
};

const createCharactersCards = (info) => {
  clearSectionContent(comicsSection);
  clearSectionContent(charactersSection);
  info.data.results.map((character) => {
    return (charactersSection.innerHTML += `<article class="card--container__character">
          <div class="img--container__character">
            <img class="img__character" src="${character.thumbnail.path}.jpg" />
          </div>
          <div class="title--container__character">
            <h3 class="title__character">${character.name}</h3>
          </div>
        </article>`);
  });
};

const clearSectionContent = (sectionClass) => (sectionClass.innerHTML = "");

//Search and Filter Functions

const updateSortByOptions = () => {
  if (typeFilterSelect.value === "characters") {
    sortBySelectForComics.classList.add("hidden");
    sortBySelectForCharacters.classList.remove("hidden");
  } else {
    sortBySelectForCharacters.classList.add("hidden");
    sortBySelectForComics.classList.remove("hidden");
  }
};

typeFilterSelect.onchange = updateSortByOptions;

const updateSortAndType = () => {
  type = typeFilterSelect.value;

  if (type === "characters") {
    sort = sortBySelectForCharacters.value;
  } else {
    sort = sortBySelectForComics.value;
  }
  return type, sort;
};

const thereIsInput = () => {
  if (searchBar.value) {
    return true;
  }
};

const searchByInput = () => {
  if (thereIsInput()) {
    searchInput = searchBar.value.toLowerCase();
    type = typeFilterSelect.value;

    if (type === "comics") {
      return `${url}&titleStartsWith=${searchInput}`;
    } else {
      return `${url}&nameStartsWith=${searchInput}`;
    }
  } else {
    return url;
  }
};

const search = (type, sort) => {
  updateSortAndType();
  createURL(type, sort);
  fetchInfo(searchByInput());
};

searchButton.onclick = search;

//Pagination
rightPageButton.onclick = () => {
  currentPage++;

  fetchInfo(createURL());
};

leftPageButton.onclick = () => {
  currentPage--;
  fetchInfo(createURL());
};

firstPageButton.onclick = () => {
  currentPage = 0;
  fetchInfo(createURL());
};

lastPageButton.onclick = () => {
  const totalPages = Math.floor(totalItems / itemsPerPage);
  const lastPageItems = totalItems % itemsPerPage;
  if (lastPageItems > 0) {
    currentPage = totalPages;
  } else {
    currentPage = totalPages - 1;
  }
  fetchInfo(createURL());
};

const updatePagination = () => {
  let offset = currentPage * itemsPerPage;

  if (offset == 0) {
    leftPageButton.disabled = true;
    firstPageButton.disabled = true;
  } else {
    leftPageButton.disabled = false;
    firstPageButton.disabled = false;
  }

  if (offset + itemsPerPage >= totalItems) {
    rightPageButton.disabled = true;
    lastPageButton.disabled = true;
  } else {
    rightPageButton.disabled = false;
    lastPageButton.disabled = false;
  }
};
