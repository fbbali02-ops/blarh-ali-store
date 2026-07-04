const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const nav = document.querySelector("nav");

if (nav && token && user) {

    nav.innerHTML = `
        <a href="index.html">🏠 Home</a>
        <a href="products.html">🛍 Products</a>
        <a href="cart.html">
            🛒 Cart (<span id="cartCount">0</span>)
        </a>
        <a href="profile.html">👤 ${user.username}</a>
        <a href="#" id="logoutBtn">🚪 Logout</a>
    `;

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    document.getElementById("logoutBtn").addEventListener("click", (e) => {

        e.preventDefault();

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "login.html";

    });

}