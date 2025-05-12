document.addEventListener('DOMContentLoaded',()=>{
    const input = document.getElementById("input")
    const search = document. getElementById("search")
    const info = document.getElementById("info")
    const error = document.getElementById("error")

search.addEventListener("click", async(e)=>{
    e.preventDefault()
    const pokemonName = input.value.trim().toLowerCase();
    if (pokemonName){
        fetchPokemon(pokemonName)
    } else alert('Introduce el nombre de un pokemon')
})
async function fetchPokemon(pokemon) {
    try {
        limpiarContenido()
        ocultarpokemon()
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        if (!respuesta.ok){
            throw new Error('Pokémon no encontrado');
        } 
            const data = await respuesta.json()
            infoPokemon(data)
        
    } catch(err){
        alert(err.message)
    }
    finally{}
}
function infoPokemon(pokemon) {
    info.innerHTML= `
<div class="card" style="width: 18rem;">
  <img src="${pokemon.sprites.other['official-artwork'].front_default }" class="card-img-top" alt="${pokemon.name}">
  <div class="card-body">
    <h5 class="card-title">${pokemon.name}</h5>
    <p class="card-text">#${pokemon.id.toString().padStart(3, '0')}</p>
  </div>
  <table class="table table-dark table-striped">
   <thead>
                    <tr>
                        <th>Habilidad</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                        ${pokemon.abilities.map(ability => `
                        <tr>
                            <td>${ability.ability.name.replace('-', ' ')}</td>
                            <td>${ability.is_hidden ? '(Habilidad oculta)' : ''}</td>
                           
                        </tr>
                    `).join('')}
                    </tbody>
</table>

</div>
   
        `;

    mostrarPokemon()
}

function mostrarPokemon() {
    info.classList.remove("hidden")
}
function ocultarpokemon() {
    info.classList.add("hidden")
}
function limpiarContenido(){
    info.innerHTML=''
}
})