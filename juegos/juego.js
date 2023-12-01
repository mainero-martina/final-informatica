
var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?'; //url de la api de donde sacamos la info
var offset = 0; //punto de inicio en 0 (seria el pokemon 1)
var limit = 150; //limite en el pokemon 150 ya que elegi solo la primer generacion
var pokemonUrl = apiUrl + 'limit=' + limit + '&offset=' + offset; //concatenamos la url con el limit y el offset
var spriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'; // la otra url de la api que nos da los sprites
const spriteElement = document.getElementById("sprite"); //obtenemos el elemento del html con el ID sprite
const guess = document.getElementById("guess"); //lo mismmo que arriba pero con id guess
const streakElement = document.getElementById("streak"); //lo mismo que arriba pero con id streak 
const pokemonNameElement = document.getElementById("pokemon-name");//lo mismo que arriba pero con pokemon-name
var streak = 0; //la cantidad de rachas comienza en 0
var pokemonName = ""; //pokemon name vacio
var pokemonData;


guess.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});  //cuando se presiona la tecla enter se chequea si acertaste


const fetchPokemonData = async function getDataFromServer(url) { //funcion asincronica con parametro url
  return fetch(url) //la funcion fetch se utiliza para realizar una solicitud a la url que le proporcionamos para obtener los datos
    .then(response => response.json()); //encadena una promesa para que una vez obtengamos los datos que pedimos arriba con el metodo.json convirtamos los datos en un json para poder utilizarlos
}//toda la funcion esta hace que podemos utilizar los datos traidos desde la api

var main = async function mainFunction() {// se define la funcion que hace que comienze todo llamada mainFunction
  let response = await fetchPokemonData(pokemonUrl); //espera que la promesa se arriba (fetchPokemonData) se resuelva 
  pokemonData = response.results; //una vez que la promesa se resuelve se toma el valor results de dentro de los datos de la api y lo declara dentro de la var pokemonData
  getPokemon(); //llamamos a get pkm
}


function checkGuess() { //funcion que chequea que hayas puesto el mismo nombre que el pkm que te aparecio
  if (pokemonName.toLowerCase() === guess.value.toLowerCase()) {
    streak++; //devuelve los datos obtenidos del participante en minuscula para que no hayan confusiones y si acertaste sumas un punto
  } else {
    streak = 0; //si no acertas se vuelve a 0 ya que es por racha 
  }
  showPokemon(); //luego de esto muestra otro pokemon para que siga el juego
}

function getPokemon() {
  pokemonNameElement.innerHTML = ""; //limpia el nombre del pkm en el html
  guess.value = ""; //limpia el nombre del pkm que pusimos anteriormente
  let pokemonNumber = getRandomIntInclusive(offset, limit + offset); //genera un numero random entre el offset y el limite incluyendo el 0 y el 150
  pokemonName = pokemonData[pokemonNumber].name; //le asigna el nombre el numero de pokemon random que generamos
  spriteElement.style.setProperty('transition', 'initial'); // animacion de transicion
  spriteElement.src = ""; //limpia el sprite
  spriteElement.style.setProperty('filter', 'brightness(0)'); // como los sprites son los pokemons con sus colores, hay que ajustar el brillo a 0 para que no se vean
  const sprite = spriteUrl + (pokemonNumber + 1).toString() + '.png';  //el sprite del pokemon esta construido por la cont spriteUrl, el numero aleatorio que conseguimos y una imagen .png
  spriteElement.src = sprite; //usa el .src para cargar la nueva imagen del pokemon
}

function showPokemon() {
  streakElement.innerHTML = "Streak: " + streak; //actualiza la racha
  spriteElement.style.setProperty('transition', 'filter 1s ease-out');//con la propiedad transicion hace que se aplique el filtro 1s ease-out al sprite (cuanso se muestra el pokemon)
  spriteElement.style.setProperty('filter', 'initial'); //se reestablece el filtro que antes estaba en brightness 0 para a ser visible para mostrar el pokemon
  pokemonNameElement.innerHTML = pokemonName; //actualiza el contenido html con el nombre del pokemon
  setTimeout(() => getPokemon(), 3000); // todo esto se ejecuta en 3 segundos y pasamos el siguiente pkm
}

function getRandomIntInclusive(min, max) { //funcion que llame mas arriba para que se elija un numero random entre 0 y 150 incluyendo a 0 y a 150
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

main();// llamamos a la funcion main creada mas arriba para que se ejecute todo