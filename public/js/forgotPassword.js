const forgotPasswordForm = document.getElementById("forgotPasswordForm");

forgotPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    try {

        const response = await fetch("https://blarh-ali-store.onrender.com/api/auth/forgot-password", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email
            })

        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            forgotPasswordForm.reset();
        }

    } catch (error) {

        console.error(error);

        alert("Unable to send reset link.");

    }

});