const poke_container = document.getElementById('poke-container');
const poke_number = 898;

const colors = {
    fire: '#fddfdf',
    grass: '#defde0',
    electric: '#fcf7de',
    water: '#def3fd',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#f5f5f5',
    fighting: '#e6e0d4',
    normal: '#f5f5f5'
}

const main_type = Object.keys(colors);
const fetchPokes = async function(){
    for(let i = 1; i <= poke_number; i++){
        await getPoke(i);
    }
}

const getPoke = async function(id){
    const url= `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const poke = await res.json();
    createPokeCard(poke);
};

function createPokeCard(poke){
    const pokeEl = document.createElement('div');
    pokeEl.classList.toggle('pokemon');

    const poke_type = poke.types.map(el => el.type.name);
    const type = main_type.find(
        type => poke_type.indexOf(type) > -1
    );
    const color = colors[type];
    pokeEl.style.backgroundColor = color;
    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const pokeInnerHTML = `
        <div class="img-container">
            <img class="lazyload" data-src="https://pokeres.bastionbot.org/images/pokemon/${poke.id}.png" onerror="this.src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${poke.id}.png'" width="108px" height="108px">
        </div>
        <div class="info">
            <span class="number">#${poke.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;
    pokeEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokeEl);
}

fetchPokes();

