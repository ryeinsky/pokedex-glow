const container = document.getElementById('pokemon-container');
const searchInput = document.getElementById('search');
const darkModeBtn = document.getElementById('dark-mode-toggle');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.getElementById('close');

const pokeCount = 151;
let allPokemon = [];

async function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  allPokemon.push(data);
  createPokemonCard(data);
}

function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('pokemon');
  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h3>${capitalize(pokemon.name)}</h3>
    <p>#${pokemon.id}</p>
  `;
  card.addEventListener('click', () => showDetail(pokemon));
  container.appendChild(card);
}

function showDetail(pokemon) {
  modalBody.innerHTML = `
    <h2>${capitalize(pokemon.name)}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"> 
    <p><strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    <p><strong>Height:</strong> ${pokemon.height}</p>
    <p><strong>Weight:</strong> ${pokemon.weight}</p>
    <div><strong>Abilities:</strong>
      <div class="abilities">
        ${pokemon.abilities.map(a => `<span class="ability-bubble">${a.ability.name}</span>`).join('')}
      </div>
    </div>
    <div><strong>Stats:</strong>
      ${pokemon.stats.map(s => `
        <p>${s.stat.name}
          <div class="stat-bar">
            <div class="stat-bar-inner" style="width:${s.base_stat}px;"></div>
          </div>
        </p>
      `).join('')}
    </div>
  `;
  modal.classList.remove('hidden');
}



function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

searchInput.addEventListener('input', (e) => {
  const keyword = e.target.value.toLowerCase();
  container.innerHTML = '';
  allPokemon
    .filter(p => p.name.includes(keyword))
    .forEach(p => createPokemonCard(p));
});

darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

async function loadPokemon() {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
}
loadPokemon();
