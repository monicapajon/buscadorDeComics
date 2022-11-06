// VARIABLES //
const urlBase = "https://gateway.marvel.com/v1/public/";
const apikey = "c65af3d8808cb67cd7fc3279e63f7b84";

const resultados = document.querySelector(".results");
const resultadosPorPagina = 20;
let paginaActual = 0;
let cantidadDeResultados = 0;
