const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const gridContainer = document.querySelector('.grid-container'); // Certifique-se de que já existe no HTML

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;

    fetch(url)
        .then(response => response.json())
        .then(result => displayResults(result, searchTerm))
        .catch(error => console.error("Erro ao buscar artistas:", error));
}

function displayResults(result, searchTerm) {
    gridContainer.innerHTML = ''; // Limpa os resultados anteriores

    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm));

    if (filteredArtists.length === 0) {
        resultArtist.classList.add('hidden'); // Esconde os artistas
        resultPlaylist.classList.remove('hidden'); // Mostra a playlist
        return;
    }

    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove('hidden');

    gridContainer.innerHTML = filteredArtists.map(artist => `
        <div class="artist-card">
            <div class="card-img">
                <img class="artist-img" src="${artist.urlImg}" alt="${artist.name}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">              
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>
        </div>
    `).join("");
}

// Evento de input para controlar a busca
document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden'); // Mostra a playlist padrão
        resultArtist.classList.add('hidden'); // Esconde os artistas
        gridContainer.innerHTML = ''; // Remove os cards
        return;
    }

    requestApi(searchTerm);
});