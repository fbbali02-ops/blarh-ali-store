async function loadStats() {

    try {

        const res = await fetch("https://blarh-ali-store.onrender.com/api/stats");
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