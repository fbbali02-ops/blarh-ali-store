const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

document.getElementById("username").textContent = user.username;
document.getElementById("email").textContent = user.email;

const profileImage = document.getElementById("profileImage");

// Show uploaded profile picture or default avatar
profileImage.src = user.profileImage
    ? user.profileImage
    : "images/default-avatar.png";

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
});