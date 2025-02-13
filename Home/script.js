// Sample Artwork Data
const artworks = [
    { id: 1, title: "Sunset Painting", category: "painting", price: 150, rating: 4.5, img: "https://source.unsplash.com/300x200/?art" },
    { id: 2, title: "Digital Portrait", category: "digital", price: 250, rating: 4.8, img: "https://source.unsplash.com/300x200/?digitalart" },
    { id: 3, title: "Sculpture Art", category: "sculpture", price: 300, rating: 4.2, img: "https://source.unsplash.com/300x200/?sculpture" },
    { id: 4, title: "Modern Photography", category: "photography", price: 80, rating: 4.0, img: "https://source.unsplash.com/300x200/?photography" },
    { id: 5, title: "Abstract Art", category: "painting", price: 180, rating: 4.7, img: "https://source.unsplash.com/300x200/?abstract" }
];

// Display Artworks Function
function displayArtworks(filteredArt = artworks) {
    const grid = document.getElementById("artworksGrid");
    grid.innerHTML = filteredArt.map(art => `
        <div class="art-item">
            <img src="${art.img}" alt="${art.title}">
            <h3>${art.title}</h3>
            <p>Category: ${art.category} | Price: $${art.price} | ⭐ ${art.rating}</p>
        </div>
    `).join("");
}

// Filter & Sort Artworks Dynamically
function applyFilters() {
    let filtered = [...artworks];
    const category = document.getElementById("categoryFilter").value;
    const price = document.getElementById("priceFilter").value;
    const sort = document.getElementById("sortFilter").value;
    const searchQuery = document.getElementById("search").value.toLowerCase();

    // Category Filtering
    if (category !== "all") filtered = filtered.filter(art => art.category === category);

    // Price Filtering
    if (price === "low") filtered = filtered.filter(art => art.price < 50);
    if (price === "medium") filtered = filtered.filter(art => art.price >= 50 && art.price <= 200);
    if (price === "high") filtered = filtered.filter(art => art.price > 200);

    // Sorting
    if (sort === "R_lowToHigh") filtered.sort((a, b) => a.rating - b.rating);
    if (sort === "R_highToLow") filtered.sort((a, b) => b.rating - a.rating);
    if (sort === "P_lowToHigh") filtered.sort((a, b) => a.price - b.price);
    if (sort === "P_highToLow") filtered.sort((a, b) => b.price - a.price);

    // Search Filtering
    if (searchQuery) {
        filtered = filtered.filter(art => art.title.toLowerCase().includes(searchQuery));
    }

    displayArtworks(filtered);
}

// Attach Event Listeners to Filters & Search
document.getElementById("categoryFilter").addEventListener("change", applyFilters);
document.getElementById("priceFilter").addEventListener("change", applyFilters);
document.getElementById("sortFilter").addEventListener("change", applyFilters);
document.getElementById("search").addEventListener("input", applyFilters);

// Initial Load (Display All Artworks)
window.onload = () => displayArtworks();
