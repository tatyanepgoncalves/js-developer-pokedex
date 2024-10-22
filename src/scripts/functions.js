const pokeBody = document.getElementById("pokemon");

function getPokemonChosen(num) {
    const doc = document.querySelector(`#pokemon-${num}`);
    const popup = document.querySelector(`#modal-pokemon`);

    doc.addEventListener("click", () => (popup.style.display = "block"));

    pokeApi.getPokemons(num - 1, 1).then((pokemonEscolhido) => {
        const htmlClose = document.createElement("div");
        const newHtml = `
            <section id="popup-pokemon" class="${pokemonEscolhido[0].typeMain}">
                <header>
                    <div class="pokemonData">
                        <div>
                            <h1>${pokemonEscolhido[0].name}</h1>
                            <ol>
                            ${pokemonEscolhido[0].type.map((type) =>`<li class="tipoPokemon">${type}</li>`).join("")}
                            </ol>
                        </div>
                                    
                        <p>#${pokemonEscolhido[0].number}</p>
                        
                    </div>
                    
                    <img class="pokemonImage" src="${
                        pokemonEscolhido[0].photo
                    }" alt="${pokemonEscolhido[0].name}">
                </header>

                <article class="pokemonDetails">

                    <div class="menu">
                        <a href="#"><button class="buttonAbout">About</button></a>
                        <a href="#"><button class="buttonStats">Base Stats</button></a>
                        <a href="#"><button class="buttonMoves">Moves</button></a>
                    </div>
        
                    <section class="conteudo">
                        <section class="about">
                            <div class="pokemonInfos">
                                <ol class="infoTitles">
                                    <li>Species (Espécie): </li>
                                    <li>Height (Altura): </li>
                                    <li>Weight (Peso) : </li>
                                    <li>Abilities (Habilidades): </li>
                                </ol>
                                <ol class="infoDescription">
                                    <li>${pokemonEscolhido[0].typeMain}</li>
                                    <li>${pokemonEscolhido[0].height} cm</li>
                                    <li>${pokemonEscolhido[0].weight/10} kg</li>
                                    <li>${pokemonEscolhido[0].ability.join(
                                        ", "
                                    )}</li>
                                </ol>
                            </div>
                        <footer class="copy">Desenvolvido por &copy Tatyane Gonçalves</footer>
                        </section>
                    </section>
                    
                    
                           `;
        const htmlAbout = `
            <section class="about">
                    <div class="pokemonInfos">
                        <ol class="infoTitles">
                            <li>Species (Espécie): </li>
                            <li>Height (Altura): </li>
                            <li>Weight (Peso) : </li>
                            <li>Abilities (Habilidades): </li>
                        </ol>
                        <ol class="infoDescription">
                            <li>${pokemonEscolhido[0].typeMain}</li>
                            <li>${pokemonEscolhido[0].height} cm</li>
                            <li>${pokemonEscolhido[0].weight/10} kg</li>
                            <li>${pokemonEscolhido[0].ability.join(", ")}</li>
                        </ol>
                    </div>
                    <footer class="copy">Desenvolvido por &copy Tatyane Gonçalves</footer>
            </section>`;
        const htmlStats = `
            <section class="base-stats">
                <div class="pokemonInfos">
                    <ol class="infoTitles">
                        ${pokemonEscolhido[0].stats
                            .map((stats) => `<li>${stats.stat.name} :</li>`)
                            .join("")}
                    </ol>
                    <ol class="infoDescription">
                        ${pokemonEscolhido[0].stats
                            .map(
                                (stats) =>
                                    `<li class="progresso">${stats.base_stat}  <progress value="${stats.base_stat}" max="100"></progress></li>`
                            )
                            .join("")}
                    </ol>
                </div>
                <footer class="copy">Desenvolvido por &copy Tatyane Gonçalves</footer>
            </section>`;
        const htmlMoves = `
            <section class="moves">
                <ol class="infoTitles">
                    <li>Em manutenção</li>
                </ol>
                <footer class="copy">Desenvolvido por &copy Tatyane Gonçalves</footer>
            </section>`;

        popup.innerHTML = newHtml;

       

        htmlClose.classList.add("close");
        htmlClose.innerText = "x";
        htmlClose.addEventListener("click",() => popup.style.display = "none");

        popup.insertAdjacentElement("afterbegin", htmlClose);

        const buttonAbout = document.querySelector(".buttonAbout");
        const buttonStats = document.querySelector(".buttonStats");
        const buttonMoves = document.querySelector(".buttonMoves");
        const conteudo = document.querySelector(".conteudo");

        buttonAbout.addEventListener("click", () => {
            buttonAbout.style.cssText = "border-bottom: 1px solid black";
            buttonStats.style.cssText = "border-bottom: none";
            buttonMoves.style.cssText = "border-bottom: none";
            conteudo.innerHTML = htmlAbout;
        });

        buttonStats.addEventListener("click", () => {
            buttonAbout.style.cssText = "border-bottom: none";
            buttonStats.style.cssText = "border-bottom: 1px solid black";
            buttonMoves.style.cssText = "border-bottom: none";
            conteudo.innerHTML = htmlStats;
        });

        buttonMoves.addEventListener("click", () => {
            buttonAbout.style.cssText = "border-bottom: none";
            buttonStats.style.cssText = "border-bottom: none";
            buttonMoves.style.cssText = "border-bottom: 1px solid black";
            conteudo.innerHTML = htmlMoves;
        });
    });
}

function id(pokemonId) {
    var numero = [String(pokemonId)];
    var zero = "0";
    var novoNumero = "";

    if (numero[0].length == 3) {
        novoNumero = numero[0];
    } else {
        for (let i = 0; numero[0].length < 3 && novoNumero.length < 3; i++) {
            numero.unshift("0");
            novoNumero = numero.join("");
        }
    }

    return novoNumero;
}