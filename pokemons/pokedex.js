//obtencion de atributos de los divs del HTML
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

//objeto que se utiliza para asignar colores a diferentes tipos de Pokémon
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

function searchPokemon(event) {
    event.preventDefault(); //evita que la pagina se recargue cuando enviamos el form
    const value = event.target.pokemon.value; //extrae el value osea el nombre del pkmn que hemos puesto en el form
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`) //solicitud a la api PokeApi Utilizo promesas
        .then(function (data) {
            return data.json();
        })//convierte los datos a un Json
        .then(function (response) {
            renderPokemonData(response);
        })//procesa el Json y obtiene la respuesta del value que la pusimos
        .catch(function (err) {
            renderNotFound();
        });// si ingresamos un pokemon no valido dentro de pokeApi se ejecuta renderNotFound    
}

function renderPokemonData(data) {
    const sprite = data.sprites.front_default;//toma desde la estructura de datos la url de la imagen del sprite del pokemon
    const stats = data.stats;
    const types = data.types;/*usa destructuracion para extraer esos valores del objeto y ahora stats y type pueden ser llamados
    como se llama a una varible*/
    pokeName.textContent = data.name; //actualiza el contenido del atributo con la informacion de name
    pokeImg.setAttribute('src', sprite); // actualiza el atributo src con la imagen del sprite
    pokeId.textContent = `Nº ${data.id}`; // actualiza el contenido del atributo con la informacion de id
    renderPokemonTypes(types);// llama a la funcion renderPokemonTypes y le pasa el array types
    renderPokemonStats(stats); //llama a la funcion renderPokemonStats y le pasa el array stats
}
function renderPokemonTypes(types) {
    pokeTypes.innerHTML = ''; //limpia el html
    types.forEach(function (type) { //recorre cada elemento del array type(itera)
        const typeTextElement = document.createElement("div"); //crea un div para mostrar el tipo
        typeTextElement.style.color = typeColors[type.type.name]; //utiliza el objetivo que declaramos arriba para darle un color al texto segun el tipo
        typeTextElement.textContent = type.type.name; //le asigna el nombre del tipo
        pokeTypes.appendChild(typeTextElement); //agrega el div recien creado a pokeTypes con el metodo appendChild
    });
}


function renderPokemonStats(stats) { //hace lo mismo que la funcion de arriba pero crea 3 divs que se usan para poner los stats del pkm
    pokeStats.innerHTML = '';
    stats.forEach(function (stat) {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}
function renderNotFound() {
    pokeName.textContent = 'No encontrado'; //mensaje de no encontrado donde deberia esta el nombre del pkm
    pokeImg.setAttribute('src', './imagenes1/poke-shadow.png'); //muestra una imagen
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';  //restablece todo a nada porque no se encontro el pokemon que escribimos
    pokeId.textContent = '';
}
