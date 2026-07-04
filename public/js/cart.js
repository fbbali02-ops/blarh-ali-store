let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart counter
function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (!cartCount) return;

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    cartCount.textContent = totalItems;
}

function addToCart(product) {

    const existing = cart.find(item => item._id === product._id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart!");
}

// Show the cart count when the page loads
updateCartCount();