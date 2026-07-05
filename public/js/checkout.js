const PAYSTACK_PUBLIC_KEY = "pk_live_ca735f91770f5a2df813699ba3bcc0935be2e1ec";

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const totalElement = document.getElementById("checkoutTotal");
const form = document.getElementById("checkoutForm");

let total = 0;

// Calculate total
cart.forEach(product => {
    total += Number(product.price) * Number(product.quantity);
});

// Display total
totalElement.textContent = `Total: GH₵ ${total}`;

// Checkout
form.addEventListener("submit", function (e) {

    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const customer = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const notes = document.getElementById("notes").value;

    const handler = PaystackPop.setup({

        key: PAYSTACK_PUBLIC_KEY,

        email: email,

        amount: Number(total) * 100,

        currency: "GHS",

        callback: function (response) {

            verifyPayment(
                response.reference,
                customer,
                email,
                phone,
                address,
                notes
            );

        },

        onClose: function () {

            alert("Payment cancelled.");

        }

    });

    handler.openIframe();

});

async function verifyPayment(reference, customer, email, phone, address, notes) {

    try {

        // Verify payment
        const verify = await fetch(
            `https://blarh-ali-store.onrender.com/api/payment/verify/${reference}`
        );

        const verifyData = await verify.json();

        console.log("Verify Response:", verifyData);

        if (verifyData.data && verifyData.data.status === "success") {

            const order = {

                customer,
                email,
                phone,
                address,
                notes,

                products: cart,

                total,

                paymentReference: reference,

                paymentStatus: "Paid"

            };

            // Save order
            const saveOrder = await fetch(
                "https://blarh-ali-store.onrender.com/api/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(order)
                }
            );

            const data = await saveOrder.json();

            console.log("Order Response:", data);

            if (!saveOrder.ok) {
                alert("Order Error:\n" + JSON.stringify(data, null, 2));
                return;
            }

            alert(data.message);

            localStorage.removeItem("cart");

            window.location.href = "index.html";

        } else {

            alert("Payment verification failed.");

        }

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}