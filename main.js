//DOM variables
const comicsSection = document.querySelector(".section-comics");
const charactersSection = document.querySelector(".section-characters");
const typeFilterSelect = document.getElementById("type__filter");
const sortBySelect = document.getElementById("sortby__filter");
const searchButton = document.querySelector(".search__button");

//Other Variables
const baseURL = "https://gateway.marvel.com/v1/public/";
const myApiKey = "09f672ea66d3144befdf6f7fc2796c10";
const itemsPerPage = 20;
const currentPage = 0;
let url = ``;

const createURL = (queryParamType, queryParamSort) => {
  queryParamType = typeFilterSelect.value;
  queryParamSort = sortBySelect.value;

  url = `${baseURL + queryParamType}?apikey=${myApiKey}&offset=${
    currentPage * itemsPerPage
  }&orderBy=${queryParamSort}`;
  return url;
};
createURL();

const fetchInfo = (url) => {
  fetch(createURL())
    .then((data) => data.json())
    .then((info) => {
      //console.log(info);
      // comicsSection.innerHTML = "";
      // info.data.results.map((comic) => {
      //   //console.log(comic);
      //   return (comicsSection.innerHTML += `
      //   <article class="card--container__comic">
      //     <div class="img--container__comic">
      //       <img class="img__comic" src="${comic.thumbnail.path}.jpg" />
      //     </div>
      //     <h3 class="title__comic">
      //       ${comic.title}
      //     </h3>
      //   </article>`);
      // });
      createComicsCards(info);
    });
};
fetchInfo();

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

const updateSearch = () => {
  searchButton.onclick = () => {
    //falta fijarse si es comic o personaje para cambiar las categor'ias de sort
    createURL();
    fetchInfo();
  };
};
updateSearch();
