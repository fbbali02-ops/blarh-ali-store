const form = document.getElementById("resetPasswordForm");

const params = new URLSearchParams(window.location.search);

const token = params.get("token");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {

        return alert("Passwords do not match.");

    }

    try {

        const response = await fetch("https://blarh-ali-store.onrender.com/api/auth/reset-password", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                token,

                password

            })

        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            window.location.href = "login.html";

        }

    } catch (error) {

        console.error(error);

        alert("Unable to reset password.");

    }

});