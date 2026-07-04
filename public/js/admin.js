const form = document.getElementById("productForm");
const tableBody = document.getElementById("productTableBody");

let editingProductId = null;

// ==========================
// LOAD PRODUCTS
// ==========================
async function loadProducts() {

    const response = await fetch("http://localhost:5000/api/products");
    const products = await response.json();

    document.getElementById("totalProducts").textContent = products.length;

    tableBody.innerHTML = "";

    products.forEach(product => {

        tableBody.innerHTML += `
        <tr>

            <td>
                <img src="${product.image}" width="70">
            </td>

            <td>${product.name}</td>

            <td>GH₵ ${product.price}</td>

            <td>${product.category}</td>

            <td>${product.stock}</td>

            <td>

                <button onclick="editProduct('${product._id}')">
                    ✏ Edit
                </button>

                <button onclick="deleteProduct('${product._id}')">
                    🗑 Delete
                </button>

            </td>

        </tr>
        `;

    });

}

loadProducts();


// ==========================
// ADD PRODUCT
// ==========================
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Editing will be updated later
    if (editingProductId) {
        alert("Image upload editing will be added next.");
        return;
    }

    const formData = new FormData();

    formData.append("name", document.getElementById("name").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("category", document.getElementById("category").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("stock", document.getElementById("stock").value);

    const imageFile = document.getElementById("image").files[0];

    if (imageFile) {
        formData.append("image", imageFile);
    }

    const response = await fetch("http://localhost:5000/api/products/add", {

        method: "POST",
        body: formData

    });

    const data = await response.json();

    alert(data.message);

    form.reset();

    loadProducts();

});


// ==========================
// EDIT PRODUCT
// ==========================
async function editProduct(id) {

    const response = await fetch("http://localhost:5000/api/products");

    const products = await response.json();

    const product = products.find(p => p._id === id);

    if (!product) return;

    editingProductId = id;

    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("category").value = product.category;
    document.getElementById("description").value = product.description;
    document.getElementById("stock").value = product.stock;

    alert("Image editing will be added next.");

}


// ==========================
// DELETE PRODUCT
// ==========================
async function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {

        method: "DELETE"

    });

    loadProducts();

}


// ==========================
// LOGOUT
// ==========================
document.getElementById("adminLogout").addEventListener("click", (e) => {

    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});
const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        loadProducts();

    });

}