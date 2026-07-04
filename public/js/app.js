async function loadProducts() {
    try {
        const response = await fetch("http://localhost:5000/api/products");
        const products = await response.json();

        const container = document.getElementById("productContainer");
        container.innerHTML = "";

        products.forEach(product => {
            container.innerHTML += `
                <div class="card">

                    <span class="badge">NEW</span>

                    <img src="${product.image}" alt="${product.name}">

                    <div class="card-content">

                        <h3>${product.name}</h3>

                        <div class="stars">
                            ⭐⭐⭐⭐⭐
                        </div>

                        <p>${product.description}</p>

                        <div class="price">
                            GH₵ ${product.price}
                        </div>

                        <button onclick='addToCart(${JSON.stringify(product)})'>
                            Add to Cart
                        </button>

                    </div>

                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

loadProducts();
const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            const search = searchInput.value.trim();

            if (search !== "") {

                window.location.href =
                    `products.html?search=${encodeURIComponent(search)}`;

            }

        }

    });

}