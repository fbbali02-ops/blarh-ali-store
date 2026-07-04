let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cartContainer");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {

    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        container.innerHTML = "<h2>Your cart is empty.</h2>";

        document.getElementById("total").innerHTML = "Total: GH₵ 0";

        return;
    }

    cart.forEach((product, index) => {

        total += product.price * product.quantity;

        container.innerHTML += `
        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <div class="card-content">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <h3 class="price">GH₵ ${product.price}</h3>

                <p><strong>Quantity:</strong> ${product.quantity}</p>

                <button onclick="increase(${index})">
                    +
                </button>

                <button onclick="decrease(${index})">
                    -
                </button>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        </div>
        `;
    });

    document.getElementById("total").innerHTML =
    "Total: GH₵ " + total;
}

function increase(index){

    cart[index].quantity++;

    saveCart();

    renderCart();

}

function decrease(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

    renderCart();

}

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

}

renderCart();
document.getElementById("checkoutBtn").addEventListener("click", () => {

    window.location.href = "checkout.html";

});