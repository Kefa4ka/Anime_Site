document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.jikan.moe/v4/anime';

    async function fetchAnimeDetails(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching anime details:', error);
            return null;
        }
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    async function loadAnimeDetails() {
        const animeId = getQueryParam('id');
        if (animeId) {
            const anime = await fetchAnimeDetails(animeId);
            if (anime) {
                const detailContainer = document.getElementById('anime-detail');
                detailContainer.innerHTML = `
                    <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
                    <h1>${anime.title}</h1>
                    <p>${anime.synopsis}</p>
                    <p><strong>Episodes:</strong> ${anime.episodes}</p>
                    <p><strong>Status:</strong> ${anime.status}</p>
                `;
            } else {
                document.getElementById('anime-detail').innerHTML = '<p>Anime details not found.</p>';
            }
        }
    }

    loadAnimeDetails();
});
