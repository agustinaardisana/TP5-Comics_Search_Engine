//DOM variables
const comicsSection = document.querySelector(".section-comics");
const charactersSection = document.querySelector(".section-characters");
const typeFilterSelect = document.getElementById("type__filter");
const sortBySelectForComics = document.getElementById("sortby--filter__comics");
const sortBySelectForCharacters = document.getElementById(
  "sortby--filter__characters"
);
const searchButton = document.querySelector(".search__button");

//Other Variables
const baseURL = "https://gateway.marvel.com/v1/public/";
const myApiKey = "09f672ea66d3144befdf6f7fc2796c10";
let type = "comics";
let sort = "title";
const itemsPerPage = 20;
const currentPage = 0;
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
      createComicsCards(info);
    });
};
fetchInfo(url);

const createComicsCards = (info) => {
  comicsSection.innerHTML = "";
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

const createCharactersCards = () => {
  charactersSection.innerHTML = "";
  info.data.results.map((character) => {
    return (charactersSection.innerHTML += `<article class="card--container__character">
          <div class="img--container__character">
            <img class="img__character" src="imgs/AVENGERS-FALCON-NEEDLE.png" />
          </div>
          <div class="title--container__character">
            <h3 class="title__character">3-D Man</h3>
          </div>
        </article>`);
  });
};

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

const search = (queryParamType, queryParamSort) => {
  searchButton.onclick = () => {
    console.log("click en buscar");
    updateSortAndType();
    console.log(type, sort);
    createURL(type, sort);
    fetchInfo(url);
  };
};
search();

const updateSortAndType = () => {
  type = typeFilterSelect.value;

  if (type === "characters") {
    sort = sortBySelectForCharacters.value;
  } else {
    sort = sortBySelectForComics.value;
  }
  return type, sort;
};
