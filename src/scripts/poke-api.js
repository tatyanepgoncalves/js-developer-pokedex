const pokeApi = {}
const pokemonHTML = document.querySelector(".pokemonData")

function convertPokemon(getPokemon){
    const pokemon = new Pokemon()
    
    pokemon.number = id(getPokemon.id)
    pokemon.name = getPokemon.name
    pokemon.id = getPokemon.id

    const types = getPokemon.types.map((type) => type.type.name)
    const [type] = types

    pokemon.type = getPokemon.types.map((tipo) => tipo.type.name)
    pokemon.typeMain = type
    pokemon.photo = getPokemon.sprites.other.dream_world.front_default
    pokemon.url = `https://pokeapi.co/api/v2/pokemon/${getPokemon.id}`
    pokemon.ability = getPokemon.abilities.map((abilities) => abilities.ability.name)
    pokemon.weight = getPokemon.weight
    pokemon.height = getPokemon.height
    pokemon.stats = getPokemon.stats.map((stats) => stats)
    pokemon.moves = getPokemon.moves.map((move) => move.move.name)

    return pokemon
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response) =>response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemon)) 
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetail) => pokemonsDetail) 
}

pokeApi.getPokemonChosen = (pokemon) => {
    return fetch(pokemon)
        .then((response) => response.json())
        .then(convertPokemon)
}

pokeApi.getPokemon = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemon)
}