const comicsSection = document.querySelector(".section-comics");

const fetchInfo = () => {
  fetch("https://rickandmortyapi.com/api/character")
    .then((data) => {
      return data.json();
    })
    .then((info) => {
      console.log(info);

      comicsSection.innerHTML = "";
      info.results.map((comic) => {
        console.log(comic);

        return (comicsSection.innerHTML += `
        <article class="card--container__comic">
          <div class="img--container__comic">
            <img class="img__comic" src="${comic.image}" />
          </div>
          <h3 class="title__comic">
            ${comic.name}
          </h3>
        </article>`);
      });
    });
};

console.log(fetchInfo());
