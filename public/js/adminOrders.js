const table = document.getElementById("ordersTable");

// Load Orders
async function loadOrders() {

    try {

        const response = await fetch("https://blarh-ali-store.onrender.com/api/orders");

        const orders = await response.json();

        table.innerHTML = "";

        if (orders.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">No orders found.</td>
                </tr>
            `;

            return;
        }

        orders.forEach(order => {

    table.innerHTML += `
        <tr>

            <td>${order.customer}</td>
            <td>${order.phone}</td>
            <td>GH₵ ${order.total}</td>
            <td>${order.paymentStatus}</td>
            <td>${order.status}</td>

            <td>

               <button onclick="window.location.href='order-details.html?id=${order._id}'">
    👁 View
</button>
                <button onclick="updateStatus('${order._id}', 'Delivered')">
                    ✅ Deliver
                </button>

                <button onclick="deleteOrder('${order._id}')">
                    🗑 Delete
                </button>

            </td>

        </tr>
    `;
});

    } catch (error) {

        console.log(error);

        alert("Failed to load orders.");

    }

}

loadOrders();

// Update Order Status
async function updateStatus(id, status) {

    try {

        const response = await fetch(
            `https://blarh-ali-store.onrender.com/api/orders/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            }
        );

        const data = await response.json();

        alert(data.message);

        loadOrders();

    } catch (error) {

        console.log(error);

    }

}

// Delete Order
async function deleteOrder(id) {

    if (!confirm("Delete this order?")) return;

    try {

        const response = await fetch(
            `https://blarh-ali-store.onrender.com/api/orders/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        alert(data.message);

        loadOrders();

    } catch (error) {

        console.log(error);

    }

}

// Logout
document.getElementById("adminLogout").addEventListener("click", (e) => {

    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});
async function viewOrder(id) {

    const res = await fetch("https://blarh-ali-store.onrender.com/api/orders");
    const orders = await res.json();

    const order = orders.find(o => o._id === id);

    if (!order) {
        alert("Order not found");
        return;
    }

    let productsList = "";

    order.products.forEach(p => {
        productsList += `
            ${p.name} x${p.quantity} - GH₵ ${p.price * p.quantity}\n
        `;
    });

    alert(
        "🧾 ORDER DETAILS\n\n" +
        "Customer: " + order.customer + "\n" +
        "Email: " + order.email + "\n" +
        "Phone: " + order.phone + "\n" +
        "Address: " + order.address + "\n\n" +
        "Products:\n" + productsList + "\n" +
        "Total: GH₵ " + order.total + "\n" +
        "Payment Ref: " + order.paymentReference
    );
}