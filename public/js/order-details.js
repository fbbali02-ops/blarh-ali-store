const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");

const container = document.getElementById("orderInfo");

async function loadOrder() {

    const res = await fetch("https://blarh-ali-store.onrender.com/api/orders");
    const orders = await res.json();

    const order = orders.find(o => o._id === orderId);

    if (!order) {
        container.innerHTML = "<h2>Order not found.</h2>";
        return;
    }

    let productsHTML = "";

    order.products.forEach(product => {

        productsHTML += `
            <div class="card">

                <img src="${product.image}" width="100">

                <div>

                    <h3>${product.name}</h3>

                    <p>Quantity: ${product.quantity}</p>

                    <p>Price: GH₵ ${product.price}</p>

                </div>

            </div>
        `;

    });

    container.innerHTML = `
        <h2>${order.customer}</h2>

        <p><strong>Email:</strong> ${order.email}</p>

        <p><strong>Phone:</strong> ${order.phone}</p>

        <p><strong>Address:</strong> ${order.address}</p>

        <p><strong>Status:</strong> ${order.status}</p>

        <p><strong>Payment:</strong> ${order.paymentStatus}</p>

        <p><strong>Reference:</strong> ${order.paymentReference}</p>

        <h2>Products</h2>

        ${productsHTML}

        <h2>Total: GH₵ ${order.total}</h2>
    `;
}

loadOrder();