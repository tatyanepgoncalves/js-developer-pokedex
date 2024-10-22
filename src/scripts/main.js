const pokemonsHTML = document.querySelector('#pokemonList')
const loadMoreButton = document.querySelector('#loadMoreButton')


const maxPokemons = 151
const limit = 10
let offset = 0

function loadMorePokemon(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => 
            `
            <li id="pokemon-${pokemon.id}" class="pokemon ${pokemon.typeMain}" onclick="getPokemonChosen(${pokemon.id})"> 
                <header class="cabecalhoPokemon">
                    <span class="nomePokemon">${pokemon.name}</span>
                    <span class="numeroPokemon">#${pokemon.number}</span>
                </header>
                <div class="detalhesPokemon">
                    <ol>
                        ${pokemon.type.map((tipo) => `<li class="tipoPokemon">${tipo}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
            
            `).join('')
        
        pokemonsHTML.innerHTML += newHTML
    
    })
}

loadMorePokemon(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    
    const proximaPaginaPokemons = offset + limit 

    if (proximaPaginaPokemons >= maxPokemons) {
        const novosPokemons = maxPokemons - offset

        loadMorePokemon(offset, novosPokemons)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadMorePokemon(offset, limit)
    }
    
})