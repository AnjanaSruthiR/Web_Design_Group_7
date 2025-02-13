// Sample Artwork Data (Including Image Paths)
// Sample Artwork Data (All 30 Images)
let artworks = [
    // Digital Art
    { id: 1, title: "Abstract Vision", category: "digital", artist: "Alice Carter", price: 150, rating: 4.5, img: "../Images/DigitalArt1.jpg", likes: 0, dislikes: 0 },
    { id: 2, title: "Future Dreams", category: "digital", artist: "Bob Smith", price: 250, rating: 4.8, img: "../Images/DigitalArt2.jpg", likes: 0, dislikes: 0 },
    { id: 3, title: "Neon Portrait", category: "digital", artist: "Catherine Hall", price: 180, rating: 4.6, img: "../Images/DigitalArt3.jpg", likes: 0, dislikes: 0 },
    { id: 4, title: "Cyberpunk City", category: "digital", artist: "David Lee", price: 300, rating: 4.9, img: "../Images/DigitalArt4.jpg", likes: 0, dislikes: 0 },
    { id: 5, title: "Futuristic Landscape", category: "digital", artist: "Eleanor West", price: 220, rating: 4.4, img: "../Images/DigitalArt5.jpg", likes: 0, dislikes: 0 },

    // Paintings
    { id: 6, title: "Ocean Waves", category: "painting", artist: "Jack Reynolds", price: 80, rating: 4.0, img: "../Images/Painting1.jpg", likes: 0, dislikes: 0 },
    { id: 7, title: "The Old Castle", category: "painting", artist: "Sophia Adams", price: 90, rating: 4.3, img: "../Images/Painting2.jpg", likes: 0, dislikes: 0 },
    { id: 8, title: "Starry Night", category: "painting", artist: "Vincent Monroe", price: 200, rating: 4.7, img: "../Images/Painting3.jpg", likes: 0, dislikes: 0 },
    { id: 9, title: "Golden Fields", category: "painting", artist: "Isabella Rivera", price: 150, rating: 4.5, img: "../Images/Painting4.jpg", likes: 0, dislikes: 0 },
    { id: 10, title: "Deep Forest", category: "painting", artist: "Henry Brooks", price: 175, rating: 4.6, img: "../Images/Painting5.jpg", likes: 0, dislikes: 0 },

    // Sculptures
    { id: 11, title: "Sculpted Beauty", category: "sculpture", artist: "Eleanor West", price: 300, rating: 4.2, img: "../Images/Sculpture1.jpg", likes: 0, dislikes: 0 },
    { id: 12, title: "Marble Titan", category: "sculpture", artist: "Alexander Stone", price: 500, rating: 4.8, img: "../Images/Sculpture2.jpg", likes: 0, dislikes: 0 },
    { id: 13, title: "The Thinker", category: "sculpture", artist: "Brandon Pierce", price: 280, rating: 4.3, img: "../Images/Sculpture3.jpg", likes: 0, dislikes: 0 },
    { id: 14, title: "Timeless Bust", category: "sculpture", artist: "Veronica Black", price: 320, rating: 4.7, img: "../Images/Sculpture4.jpg", likes: 0, dislikes: 0 },
    { id: 15, title: "Roman Elegance", category: "sculpture", artist: "Oliver Knight", price: 450, rating: 4.9, img: "../Images/Sculpture5.jpg", likes: 0, dislikes: 0 },

    // More Digital Art
    { id: 16, title: "Surreal Dream", category: "digital", artist: "Lucas Moore", price: 200, rating: 4.6, img: "../Images/DigitalArt6.jpg", likes: 0, dislikes: 0 },
    { id: 17, title: "Galactic Odyssey", category: "digital", artist: "Sophia Carter", price: 260, rating: 4.8, img: "../Images/DigitalArt7.jpg", likes: 0, dislikes: 0 },
    { id: 18, title: "The Awakening", category: "digital", artist: "Ethan Ramirez", price: 180, rating: 4.7, img: "../Images/DigitalArt8.jpg", likes: 0, dislikes: 0 },
    { id: 19, title: "Electric Dreams", category: "digital", artist: "Olivia Bennett", price: 240, rating: 4.5, img: "../Images/DigitalArt9.jpg", likes: 0, dislikes: 0 },
    { id: 20, title: "Fantasy Realm", category: "digital", artist: "Noah Scott", price: 280, rating: 4.9, img: "../Images/DigitalArt10.jpg", likes: 0, dislikes: 0 },

    // More Paintings
    { id: 21, title: "Sunset Over Hills", category: "painting", artist: "Daniel Green", price: 120, rating: 4.3, img: "../Images/Painting6.jpg", likes: 0, dislikes: 0 },
    { id: 22, title: "Misty Morning", category: "painting", artist: "Emily White", price: 140, rating: 4.5, img: "../Images/Painting7.jpg", likes: 0, dislikes: 0 },
    { id: 23, title: "Winter Cabin", category: "painting", artist: "Benjamin Foster", price: 130, rating: 4.4, img: "../Images/Painting8.jpeg", likes: 0, dislikes: 0 },
    { id: 24, title: "The Lonely Tree", category: "painting", artist: "Charlotte King", price: 160, rating: 4.6, img: "../Images/Painting9.jpg", likes: 0, dislikes: 0 },
    { id: 25, title: "Red Blossom", category: "painting", artist: "Mason Turner", price: 190, rating: 4.8, img: "../Images/Painting10.jpg", likes: 0, dislikes: 0 },

    // More Sculptures
    { id: 26, title: "Venus Reimagined", category: "sculpture", artist: "Liam Wright", price: 420, rating: 4.7, img: "../Images/Sculpture6.jpg", likes: 0, dislikes: 0 },
    { id: 27, title: "Mystic Stone", category: "sculpture", artist: "Emma Hayes", price: 380, rating: 4.6, img: "../Images/Sculpture7.jpg", likes: 0, dislikes: 0 },
    { id: 28, title: "Ancient Figure", category: "sculpture", artist: "William Cooper", price: 490, rating: 4.9, img: "../Images/Sculpture8.jpg", likes: 0, dislikes: 0 },
    { id: 29, title: "The Guardian", category: "sculpture", artist: "James Scott", price: 460, rating: 4.8, img: "../Images/Sculpture9.jpg", likes: 0, dislikes: 0 },
    { id: 30, title: "Ethereal Form", category: "sculpture", artist: "Sophia Adams", price: 430, rating: 4.7, img: "../Images/Sculpture10.jpg", likes: 0, dislikes: 0 }
];

function loadStoredData() {
    const storedData = JSON.parse(localStorage.getItem("artworks"));
    if (storedData && Array.isArray(storedData) && storedData.length > 0) {
        artworks = storedData;
    }
}

function saveData() {
    localStorage.setItem("artworks", JSON.stringify(artworks));
}

function getUserLikes() {
    return JSON.parse(localStorage.getItem("userLikes")) || {};
}

function saveUserLikes(userLikes) {
    localStorage.setItem("userLikes", JSON.stringify(userLikes));
}

function isUserLoggedIn() {
    return localStorage.getItem("loggedInUser") !== null;
}

function checkLoginAndProceed(action, artworkId) {
    if (!isUserLoggedIn()) {
        window.location.href = "login.html";
    } else {
        updateLikeDislike(action, artworkId);
    }
}

function updateLikeDislike(action, artworkId) {
    let userLikes = getUserLikes();

    if (userLikes[artworkId]) {
        alert("You have already liked or disliked this artwork!");
        return;
    }

    let artwork = artworks.find(art => art.id === artworkId);
    if (action === "like") {
        artwork.likes += 1;
    } else if (action === "dislike") {
        artwork.dislikes += 1;
    }

    userLikes[artworkId] = action; 
    saveUserLikes(userLikes);
    saveData();
    displayArtworks();
}

function displayArtworks(filteredArt = artworks) {
    const grid = document.getElementById("artworksGrid");

    if (!grid) {
        console.error("Error: Element with ID 'artworksGrid' not found!");
        return;
    }

    grid.innerHTML = filteredArt.map(art => `
        <div class="art-item">
            <img src="${art.img}" alt="${art.title}" onerror="this.onerror=null; this.src='Images/placeholder.jpg';">
            <h3>${art.title}</h3>
            <p>By: <strong>${art.artist}</strong></p>
            <p>Category: ${art.category} | Price: $${art.price} | ⭐ ${art.rating}</p>
            <div class="like-dislike">
                <button class="like-btn" onclick="checkLoginAndProceed('like', ${art.id})">👍</button>
                <span id="likes-${art.id}">${art.likes}</span>
                <button class="dislike-btn" onclick="checkLoginAndProceed('dislike', ${art.id})">👎</button>
                <span id="dislikes-${art.id}">${art.dislikes}</span>
            </div>
        </div>
    `).join("");
}

function applyFilters() {
    let filtered = [...artworks];

    const category = document.getElementById("categoryFilter")?.value;
    const price = document.getElementById("priceFilter")?.value;
    const sort = document.getElementById("sortFilter")?.value;
    const searchQuery = document.getElementById("search")?.value.toLowerCase();

    if (category && category !== "all") {
        filtered = filtered.filter(art => art.category === category);
    }

    if (price === "low") filtered = filtered.filter(art => art.price < 50);
    if (price === "medium") filtered = filtered.filter(art => art.price >= 50 && art.price <= 200);
    if (price === "high") filtered = filtered.filter(art => art.price > 200);

    if (sort === "R_lowToHigh") filtered.sort((a, b) => a.rating - b.rating);
    if (sort === "R_highToLow") filtered.sort((a, b) => b.rating - a.rating);
    if (sort === "P_lowToHigh") filtered.sort((a, b) => a.price - b.price);
    if (sort === "P_highToLow") filtered.sort((a, b) => b.price - a.price);

    if (searchQuery) {
        filtered = filtered.filter(art => art.title.toLowerCase().includes(searchQuery) || art.artist.toLowerCase().includes(searchQuery));
    }

    displayArtworks(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
    loadStoredData();
    displayArtworks();

    document.getElementById("categoryFilter")?.addEventListener("change", applyFilters);
    document.getElementById("priceFilter")?.addEventListener("change", applyFilters);
    document.getElementById("sortFilter")?.addEventListener("change", applyFilters);
    document.getElementById("search")?.addEventListener("input", applyFilters);
});