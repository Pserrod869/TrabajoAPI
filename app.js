// 🛑 REEMPLAZA ESTO CON TU TOKEN DE SUPERHEROAPI.COM
const ACCESS_TOKEN = '4631d433d6851b22e61b55d6f7c42069';

// Elementos del DOM
const searchBtn = document.getElementById('searchBtn');
const heroInput = document.getElementById('heroInput');
const resultsContainer = document.getElementById('results');

// Evento al hacer clic en buscar
searchBtn.addEventListener('click', () => {
    const heroName = heroInput.value.trim();
    if (heroName) {
        fetchHeroData(heroName);
    } else {
        alert('Por favor, escribe un nombre antes de buscar.');
    }
});

// Permitir buscar pulsando la tecla "Enter"
heroInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Función para obtener los datos de la API
async function fetchHeroData(name) {
    // Mostramos un mensaje de carga
    resultsContainer.innerHTML = '<p>Buscando en los archivos secretos... 🕵️‍♂️</p>';
    
    try {
        // Hacemos la petición a la API
        const response = await fetch(`https://superheroapi.com/api.php/${ACCESS_TOKEN}/search/${name}`);
        const data = await response.json();

        // Comprobamos si la API nos devuelve resultados válidos
        if (data.response === 'success') {
            // Pasamos el primer resultado encontrado a la función de renderizado
            renderHero(data.results[0]); 
        } else {
            resultsContainer.innerHTML = `<p style="color:#e94560;">No se encontró ningún héroe con el nombre "${name}".</p>`;
        }
    } catch (error) {
        console.error('Error al conectar con la API:', error);
        resultsContainer.innerHTML = '<p style="color:#e94560;">Error de conexión. Revisa tu consola o verifica que tu Token es correcto.</p>';
    }
}

// Función para pintar los datos en el HTML
function renderHero(hero) {
    resultsContainer.innerHTML = `
        <div class="hero-card">
            <h2>${hero.name}</h2>
            <p><strong>Nombre real:</strong> ${hero.biography['full-name'] || 'Desconocido'}</p>
            <p><strong>Universo:</strong> ${hero.biography.publisher}</p>
            <br>
            <img src="${hero.image.url}" alt="Imagen de ${hero.name}">
            
            <h3 style="margin-bottom: 15px;">Estadísticas de Poder</h3>
            <div class="stats-grid">
                <div class="stat-item"><strong>🧠 Inteligencia:</strong> ${hero.powerstats.intelligence}</div>
                <div class="stat-item"><strong>💪 Fuerza:</strong> ${hero.powerstats.strength}</div>
                <div class="stat-item"><strong>⚡ Velocidad:</strong> ${hero.powerstats.speed}</div>
                <div class="stat-item"><strong>🛡️ Durabilidad:</strong> ${hero.powerstats.durability}</div>
                <div class="stat-item"><strong>✨ Poder:</strong> ${hero.powerstats.power}</div>
                <div class="stat-item"><strong>⚔️ Combate:</strong> ${hero.powerstats.combat}</div>
            </div>
        </div>
    `;
}