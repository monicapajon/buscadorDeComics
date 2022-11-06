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

  // MOSTRAR RESULTADOS DE BUSQUEDA //

const mostrarResultados = (
    type = "comics",
    order = "title",
    inputSearch = ""
  ) => {
    let inputContainer = "";
    offset = paginaActual * resultadosPorPagina;
    if (inputSearch !== "") {
      if (type == "comics") {
        inputContainer = `&titleStartsWith=${inputSearch}`;
      }
      if (type == "characters") {
        inputContainer = `&nameStartsWith=${inputSearch}`;
      }
    }
    fetch(
      `${urlBase}${type}?apikey=${apikey}&orderBy=${order}${inputContainer}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data) => {
        
        console.log("pagina del comic:", data);
        cantidadDeResultados = data.data.total;
        resultados.innerHTML = "";
  
        data.data.results.map((selectType) => {
          if (type == "comics") {
            return (resultados.innerHTML += mostrarComics(selectType));
          }
          if (type == "characters") {
            return (resultados.innerHTML += mostrarCharacters(selectType));
          }
        });
  
        let offset = data.data.offset;
        onOffBotones(offset, cantidadDeResultados);
        mostrarCantidadResultados(cantidadDeResultados);
        verInfoComic();
        verInfoCharact();
      });
  };
  mostrarResultados();
  
  const buscarResultados = () => {
    if (inputSearch.value != "") {
      if (selectType.value === "characters") {
        mostrarResultados(
          selectType.value,
          selectSortCharacter.value,
          inputSearch.value
        );
      } else {
        mostrarResultados(
          selectType.value,
          selectSortComic.value,
          inputSearch.value
        );
      }
    } else {
      if (selectType.value === "characters") {
        mostrarResultados(selectType.value, selectSortCharacter.value);
      } else {
        mostrarResultados(selectType.value, selectSortComic.value);
      }
    }
  };
  
  botonSearch.onclick = () => {
    paginaActual = 0;
    buscarResultados();
  };
  
  // PAGINACION //

proximaPagina.onclick = () => {
    resultados.innerHTML = "";
    paginaActual++;
    buscarResultados();
  };
  
  anteriorPagina.onclick = () => {
    resultados.innerHTML = "";
    paginaActual--;
    buscarResultados();
  };
  
  primeraPagina.onclick = () => {
    resultados.innerHTML = "";
    paginaActual = 0;
    buscarResultados();
  };
  
  ultimaPagina.onclick = () => {
    restoResultados = cantidadDeResultados % resultadosPorPagina;
    if (restoResultados > 0) {
      paginaActual =
        (cantidadDeResultados - restoResultados) / resultadosPorPagina;
    } else {
      paginaActual = cantidadDeResultados / resultadosPorPagina - 1;
    }
    buscarResultados();
  };
  
  // =>deshabilitar paginacion
  
  onOffBotones = (offset = "0", cantidadDeResultados = "0") => {
    if (paginaActual == 0) {
      primeraPagina.disabled = true;
      anteriorPagina.disabled = true;
    } else {
      primeraPagina.disabled = false;
      anteriorPagina.disabled = false;
    }
    if (offset + 20 >= cantidadDeResultados) {
      proximaPagina.disabled = true;
      ultimaPagina.disabled = true;
    } else {
      proximaPagina.disabled = false;
      ultimaPagina.disabled = false;
    }
  };
  // desactivar boton search
  
  offSearchBoton = () => {
    document.querySelector(".search-button").disabled = true;
  };

  // => MOSTRAR CANTIDAD DE RESULTADOS //

const mostrarCantidadResultados = (cantidadDeResultados) => {
    numeroDeResultados.innerHTML = `${cantidadDeResultados}`;
  };

  
  

