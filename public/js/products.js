async function loadProducts() {
    try {

        const response = await fetch("https://blarh-ali-store.onrender.com/api/products");
        const products = await response.json();

        const params = new URLSearchParams(window.location.search);
        const category = params.get("category");
        const search = params.get("search");

        const title = document.getElementById("categoryTitle");

       let filteredProducts = products;

if (category) {

    filteredProducts = products.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
    );

    title.textContent = category;

}

else if (search) {

    filteredProducts = products.filter(product =>

        product.name.toLowerCase().includes(search.toLowerCase()) ||

        product.category.toLowerCase().includes(search.toLowerCase()) ||

        product.description.toLowerCase().includes(search.toLowerCase())

    );

    title.textContent = `Search: ${search}`;

}

else {

    title.textContent = "All Products";

}

        const container = document.getElementById("productContainer");
        container.innerHTML = "";

        if (filteredProducts.length === 0) {
            container.innerHTML = "<h2>No products found.</h2>";
            return;
        }

        filteredProducts.forEach(product => {

            container.innerHTML += `
                <div class="card">

                    <img src="${product.image}" alt="${product.name}">

                    <div class="card-content">

                        <h3>${product.name}</h3>

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