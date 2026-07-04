async function loadStats() {

    try {

        const res = await fetch("http://localhost:5000/api/stats");
        const data = await res.json();

        document.getElementById("totalProducts").textContent = data.products;
        document.getElementById("totalUsers").textContent = data.users;
        document.getElementById("totalOrders").textContent = data.orders;
        document.getElementById("totalRevenue").textContent = "GH₵ " + data.revenue;

    } catch (error) {

        console.log(error);

    }

}

loadStats();