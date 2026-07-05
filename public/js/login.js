const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://blarh-ali-store.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {

            // Save the login token
          localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

alert("Login successful!");

window.location.href = "index.html";
        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to login.");

    }
});