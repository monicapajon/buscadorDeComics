// VARIABLES //
const urlBase = "https://gateway.marvel.com/v1/public/";
const apikey = "c65af3d8808cb67cd7fc3279e63f7b84";

const resultados = document.querySelector(".results");
const resultadosPorPagina = 20;
let paginaActual = 0;
let cantidadDeResultados = 0;

// =>PAGINACION
const primeraPagina = document.querySelector(".button__first-left");
const ultimaPagina = document.querySelector(".button__last");
const proximaPagina = document.querySelector(".button__right");
const anteriorPagina = document.querySelector(".button__left");

// =>SEARCH Y SELECT
const inputSearch = document.querySelector(".search--input");
const botonSearch = document.querySelector(".search-button");
const selectType = document.querySelector("#search-type");
const selectSort = document.querySelector("#search-sort");
const selectSortComic = document.querySelector(".select-sort-comics");
const selectSortCharacter = document.querySelector(".select-sort-character");

const numeroDeResultados = document.querySelector(".results-number");
const titleDeResultados = document.querySelector(".results-title");

// SELECCION //

selectType.onchange = () => {
    if (selectType.value == "comics") {
      selectSortComic.classList.remove("hidden");
      selectSortCharacter.classList.add("hidden");
    }
    if (selectType.value == "characters") {
      selectSortComic.classList.add("hidden");
      selectSortCharacter.classList.remove("hidden");
    }
  };

  // MOSTRAR CARDS //

mostrarComics = (comic) => {
    return `
      <div class="comic-card">
          <div class="comic-img-container">
              <img src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" alt="" class="comic-thumbnail" data-id="${comic.id}"/>
          </div>
          <h3 class="comic-title">${comic.title}</h3>
      </div>
      `;
  };
  mostrarCharacters = (character) => {
    return `
      <div class="character-card">
          <div class="character-img-container">
              <img src="${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}" alt="" class="character-thumbnail" data-id="${character.id}" />
          </div>
          <div class="character-name-container">
              <h3 class="character-name">${character.name}</h3>
          </div>
      </div>
      `;
  };

  