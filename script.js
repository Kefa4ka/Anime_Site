document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.jikan.moe/v4';

    async function fetchAnime() {
        try {
            const response = await fetch(`${apiUrl}/top/anime?limit=20`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching anime:', error);
            return [];
        }
    }

    function displayAnime(animeList) {
        const container = document.getElementById('anime-list');
        container.innerHTML = ''; // Очищення контейнера перед додаванням нових елементів
        animeList.forEach(anime => {
            const animeItem = document.createElement('div');
            animeItem.classList.add('anime-item');
            animeItem.innerHTML = `
                <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
                <h2>${anime.title}</h2>
                <p>${anime.synopsis.substring(0, 100)}...</p>
                <a href="anime.html?id=${anime.mal_id}">View Details</a>
            `;
            container.appendChild(animeItem);
        });
    }

    async function loadAnime() {
        const animeList = await fetchAnime();
        displayAnime(animeList);
    }

    loadAnime();
});
