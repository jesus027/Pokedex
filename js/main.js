const pokeContent = document.getElementById('pokemonContent');
let pokeForm = document.getElementById('searchPokemon');
let generationshow = 1
const modalSearch = document.getElementById('pokemonContent')
const divGeneration = document.getElementById('textGen')

/*orden de las generaciones*/
/*Primera Gen 1-151*/
/*Segunda Gen 152-251*/
/*tercera Gen 252-386*/
/* cuarta Gen 387-493 */
/* quinta Gen 494 - 649 */

function showPokemonGen(gen){
    const pokemonGen = {
        1:[1, 151],
        2:[152,251],
        3:[252, 386],
        4:[387, 493],
        5:[494, 649],
        6:[650, 721],
        7:[722, 809],
        8:[810, 905]
    };

    const pokemonGenDefault = [1, 151];
    const generacion = pokemonGen[gen] || pokemonGenDefault;
    return generacion;
    
}

let pokemonGeneration = showPokemonGen(generationshow)


/*cambiar de generacion*/

let arrowRight = document.getElementById('arrow-right').addEventListener('click', e=>{

    if (generationshow < 8){
        modalSearch.innerHTML = '';
        generationshow += 1
        pokemonGeneration = showPokemonGen(generationshow)
        divGeneration.innerHTML = 'Gen ' + generationshow
        drawPokemon()
    }
})


let arrowleft = document.getElementById('arrow-left').addEventListener('click', e=>{
    
    if (generationshow > 0){
        modalSearch.innerHTML = '';
        generationshow -= 1
        pokemonGeneration = showPokemonGen(generationshow)
        divGeneration.innerHTML = 'Gen ' + generationshow
        drawPokemon()
        console.log(generationshow)
    }
})


const drawPokemon = async () =>{
    for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
		await getPokemon(i);
	}
}

const getPokemon = async (id, modal) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const rest = await fetch(url);
    const pokemon = await rest.json();
    createPokemon(pokemon, modal);
}

/*pintar card pokemon*/
const colors = {
    fire: '#F4511E',
	grass: '#8FD594',
	electric: '#FFE43B',
	water: '#7E97C0',
	ground: '#CAAC4D',
	rock: '#90642D',
	poison: '#9D5B9B',
	bug: '#EAFD71',
	dragon: '#FF6F00',
	psychic: '#FF96B5',
	flying: '#D4E6F1',
	fighting: '#FF5D5D',
	normal: '#F7F9F9',
    steel: '#607D8B',
    fairy: '#F48FC9',
    dark: '#616161',
    ghost: '#BDBDBD',
    ice: '#4FC3F7'
}

const main_types = Object.keys(colors)


function  createPokemon(pokemon, modal){
    const pokemonEl = document.createElement('div');
    
	pokemonEl.classList.add('pokemon');
    
	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	

	if (modal !==true){
        const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
    `;
        pokemonEl.innerHTML = pokeInnerHTML;
        pokeContent.appendChild(pokemonEl);
    }

    else{
        const pokeInnerHTML = `
        <div class="modal" id="modalPokemon">
        <div class="pokemon">
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
        </div>
    
    </div>`;
                

    modalSearch.innerHTML = pokeInnerHTML;
        
    }
}

drawPokemon()


/*Buscar pokemon*/

pokeForm.addEventListener('submit', e =>{
    e.preventDefault();
    let searchPokemon = document.getElementById('pokemon').value;
    getPokemon(searchPokemon, true);
})

function exitModal(){
    const modalPokemon = document.getElementById('modalPokemon');
    modalPokemon.style.display ='none'
    drawPokemon()
}