// ==========================
// ADMIN PROTECTION
// ==========================

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
    alert("Please login first.");
    window.location.href = "login.html";
}

if (user.role !== "admin") {
    alert("Access denied.");
    window.location.href = "index.html";
}

// ==========================
// ELEMENTS
// ==========================

const form = document.getElementById("productForm");
const tableBody = document.getElementById("productTableBody");

let editingProductId = null;

// ==========================
// LOAD PRODUCTS
// ==========================

async function loadProducts() {

    try {

        const response = await fetch("https://blarh-ali-store.onrender.com/api/products");
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

    } catch (error) {

        console.error(error);

    }

}

loadProducts();

// ==========================
// ADD PRODUCT
// ==========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (editingProductId) {

        alert("Image editing will be added next.");

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

    try {

        const response = await fetch("https://blarh-ali-store.onrender.com/api/products/add", {

            method: "POST",

            body: formData

        });

        const data = await response.json();

        alert(data.message);

        form.reset();

        loadProducts();

    } catch (error) {

        console.error(error);

        alert("Failed to add product.");

    }

});

// ==========================
// EDIT PRODUCT
// ==========================

async function editProduct(id) {

    const response = await fetch("https://blarh-ali-store.onrender.com/api/products");

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

    await fetch(`https://blarh-ali-store.onrender.com/api/products/${id}`, {

        method: "DELETE"

    });

    loadProducts();

}

// ==========================
// SEARCH
// ==========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        loadProducts();

    });

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