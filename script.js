const poke_container = document.getElementById('poke-container');
const poke_number = 200;
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

fetchPokes();

async function fetchPokes () {
    for (let i = 1; i <= poke_number; i++) {
        await getPokeCard(i);
    }
}

async function getPokeCard (id) {
    try{
        const url = getDataUrl(id);
        const res = await fetch(url);
        const dataJson = await res.json();
        createCard(dataJson);
    }
    catch(error){
        console.log(error);
    }
}

function createCard(data){
    const card = document.createElement('div');
    const types = data.types.map(o => o.type.name);
    const poke_type = main_type.find(type => types.indexOf(type) > -1);
    const poke_id = data.id.toString().padStart(3, '0');
    const poke_url = getImageUrl(poke_id);

    card.style.background = colors[poke_type];
    card.className = 'pokemon';
    card.innerHTML = createHTMLCard({
        name: data.name,
        type: poke_type,
        id: poke_id,
        url: poke_url,
    });
    
    poke_container.appendChild(card);
}

function createHTMLCard(data){
    return `
        <div class="img-container">
            <img loading="lazy" src=${data.url} width="108px" height="108px">
        </div>
        <div class="info">
            <span class="number">#${data.id}</span>
            <h3 class="name">${data.name}</h3>
            <small class="type">Type: <span>${data.type}</span></small>
        </div>
    `;
}

function getDataUrl(id){
    return `https://pokeapi.co/api/v2/pokemon/${id}`;
}

function getImageUrl(id){
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
}