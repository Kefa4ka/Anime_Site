// Отримуємо елемент для списку аніме
const animeListElement = document.getElementById('anime-list');

// Функція для отримання популярних аніме
async function fetchPopularAnime() {
    try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime');
        const data = await response.json();

        // Проходимо по всіх аніме і додаємо їх на сторінку
        data.data.forEach(anime => {
            const animeItem = document.createElement('div');
            animeItem.classList.add('anime-item');
            animeItem.setAttribute('data-title', anime.title);
            animeItem.setAttribute('data-id', anime.mal_id); // Додаємо ID аніме для ідентифікації

            animeItem.innerHTML = `
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <h2>${anime.title}</h2>
                <p>Genre: ${anime.genres.map(genre => genre.name).join(', ')}</p>
                <p>Description: ${anime.synopsis.split('.').slice(0, 1)}...</p>
            `;

            // Додаємо обробник події для переходу на детальну сторінку
            animeItem.addEventListener('click', function() {
                window.location.href = `anime.html?id=${anime.mal_id}`;
            });

            animeListElement.appendChild(animeItem);
        });
    } catch (error) {
        console.error('Error fetching anime:', error);
    }
}

// Викликаємо функцію для отримання даних
fetchPopularAnime();

// Функція пошуку
document.getElementById('search').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let animeItems = document.getElementsByClassName('anime-item');

    Array.from(animeItems).forEach(function(item) {
        let title = item.getAttribute('data-title').toLowerCase();

        if (title.includes(filter)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});
