const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('news-category');

// the correct IDs for each category section
const sections = {
    technology: document.getElementById('tech-news'),
    sports: document.getElementById('sports-news'),
    business: document.getElementById('business-news'),
    health: document.getElementById('health-news')
};

// CORS Proxy to bypass CORS issues
const CORS_PROXY = "https://api.allorigins.win/raw?url=";
const API_URL = "https://api.currentsapi.services/v1/latest-news"; 

// Use the API key 
const API_KEY = 'YoO2A6e-21zTW3JUZ052lNIRNd28C_A8FKPIbGXMNnsM0cLO'; 

document.addEventListener("DOMContentLoaded", function() {
    fetchNews("technology");
});

categorySelect.addEventListener('change', function() {
    fetchNews(this.value);
});

searchInput.addEventListener("input", function() {
    filterNews(this.value);
});

// Fetch the news data
function fetchNews(category) {
    const url = `${CORS_PROXY}${encodeURIComponent(`${API_URL}?category=${category}&language=en&apiKey=${API_KEY}`)}`;

    sections[category].innerHTML = `<p>Fetching latest ${category} news...</p>`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data from the API.");
            }
            return response.json();
        })
        .then(data => {
            // Log the data to the console for debugging purposes
            console.log(data);

            // Check if the API response is valid
            if (data.status === "ok" && data.news && data.news.length > 0) {
                sections[category].innerHTML = data.news.map(article => `
                    <article>
                        <h3>${article.title}</h3>
                        <p>${article.description || "No description available."}</p>
                        <a href="${article.url}" target="_blank">Read more...</a>
                    </article>
                `).join('');
            } 
            else {
                sections[category].innerHTML = `<p>No news available for this category.</p>`;
            }
        })
        .catch(error => {
            sections[category].innerHTML = `<p>Failed to load news due to a network error.</p>`;
            console.error("Error fetching news:", error);
        });
}

// Filter news based on search query
function filterNews(query) {
    Object.keys(sections).forEach(category => {
        const articles = sections[category].querySelectorAll('article');
        articles.forEach(article => {
            const text = article.textContent.toLowerCase();
            article.style.display = text.includes(query.toLowerCase()) ? "block" : "none";
        });
    });
}

// Toggle the mobile menu visibility
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});
