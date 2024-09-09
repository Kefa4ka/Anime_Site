// Функція для отримання параметрів з URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id')
    };
}

// Функція для отримання детальної інформації про аніме
async function fetchAnimeDetails() {
    const { id } = getQueryParams();

    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();

        const anime = data.data;
        const animeDetailElement = document.getElementById('anime-detail');

        animeDetailElement.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h2>${anime.title}</h2>
            <p>Genre: ${anime.genres.map(genre => genre.name).join(', ')}</p>
            <p>Episodes: ${anime.episodes}</p>
            <p>Status: ${anime.status}</p>
            <p>Description: ${anime.synopsis}</p>
        `;
    } catch (error) {
        console.error('Error fetching anime details:', error);
    }
}

// Викликаємо функцію для отримання даних
fetchAnimeDetails();
