//DOM variables
const resultsContainer = document.querySelector(".results--container");
const comicsSection = document.querySelector(".section-comics");
const charactersSection = document.querySelector(".section-characters");
const typeFilterSelect = document.getElementById("type__filter");
const sortBySelectForComics = document.getElementById("sortby--filter__comics");
const sortBySelectForCharacters = document.getElementById(
  "sortby--filter__characters"
);
const searchButton = document.querySelector(".search__button");
const searchBar = document.getElementById("input__search");
const resultsNumber = document.querySelector(".results__number");
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
      console.log(info);
      findResultsNumber(info);
      if (type === "comics") {
        createComicsCards(info);
      } else if (type === "characters") {
        createCharactersCards(info);
      } else if (type == `comics/${comicId}`) {
        updateComicInfo(info);
      }
      updatePagination();
    });
};
fetchInfo(url);

const createComicsCards = (info) => {
  clearSectionContent(resultsContainer);
  info.data.results.map((comic) => {
    return (resultsContainer.innerHTML += `
        <article class="card--container__comic" id="${comic.id}">
          <div class="img--container__comic">
            <img class="thumbnail img__comic" src="${comic.thumbnail.path}.${comic.thumbnail.extension}" />
          </div>
          <h3 class="title__comic">
            ${comic.title}
          </h3>
        </article>`);
  });
  findAndReplaceBrokenImg();
  displayComicSection();
};

const createCharactersCards = (info) => {
  clearSectionContent(resultsContainer);
  info.data.results.map((character) => {
    return (resultsContainer.innerHTML += `<article class="card--container__character">
          <div class="img--container__character">
            <img class="thumbnail img__character" src="${character.thumbnail.path}.${character.thumbnail.extension}" />
          </div>
          <div class="title--container__character">
            <h3 class="title__character">${character.name}</h3>
          </div>
        </article>`);
  });
  findAndReplaceBrokenImg();
};

const clearSectionContent = (sectionClass) => (sectionClass.innerHTML = "");
const show = (elementName) => elementName.classList.remove("hidden");
const hide = (elementName) => elementName.classList.add("hidden");

const findAndReplaceBrokenImg = () => {
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumbnail) => {
    if (
      thumbnail.src ==
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      thumbnail.src = "imgs/not_found.jpg";
    }
  });
};

const findResultsNumber = (info) => {
  totalItems = info.data.total;
  resultsNumber.textContent = totalItems;
  return totalItems;
};

//Search and Filter Functions
const updateSortByOptions = () => {
  if (typeFilterSelect.value === "characters") {
    hide(sortBySelectForComics);
    show(sortBySelectForCharacters);
  } else {
    hide(sortBySelectForCharacters);
    show(sortBySelectForComics);
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
  currentPage = 0;
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

//Display Comic Info

const displayComicSection = () => {
  const comicCards = document.querySelectorAll(".card--container__comic");
  comicCards.forEach((comic) => {
    comic.onclick = () => {
      comicId = comic.id;
      clearSectionContent(resultsContainer);
      hide(resultsContainer);
      show(comicsSection);
      fetchComicInfo(comicId);
    };
  });
};

const fetchComicInfo = (comicId) => {
  type = `comics/${comicId}`;
  fetchInfo(createURL());
};

const updateComicInfo = (info) => {
  console.log(info);
  clearSectionContent(comicsSection);
  info.data.results.map((comic) => {
    const imgURL = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
    const onSaleDate = comic.dates.filter(
      (date) => date.type == "onsaleDate"
    )[0].date;
    const writer = creatorsListHasWriter(comic);

    return (comicsSection.innerHTML = `
    <article class="info--container__comic" id="${comic.id}">
      <div class="img--container__comic">
        <img class="thumbnail img__comic" src="${imgURL}" />
      </div>
      <h2 class="title__comic">
        ${comic.title}
      </h2>
      <h3>
      Publicado:
      <p>${onSaleDate}</p>
      </h3>
      <h3>
      Guionista/s:
      <p>${writer}</p>
      </h3>
      <h3>
      Descripción:
      <p>${comic.description || `No disponible`}</p>
      </h3>
    </article>`);
  });
};

const displayComicInfo = () => {
  //aca va a ir el return de updateComicInfo
};

const creatorsListHasWriter = (comic) => {
  const creatorsList = comic.creators.items;
  const hasWriter = creatorsList.some((creator) => creator.role == "writer");

  return creatorsList.length > 0 && hasWriter
    ? findWriterName(creatorsList)
    : `No disponible`;
};

const findWriterName = (creatorsList) => {
  const writerName = creatorsList
    .filter((creator) => creator.role == "writer")
    .map((creator) => creator.name);

  return writerName.length > 1 ? writerName.join(", ") : writerName[0];
};

const findSaleDate = () => {};
