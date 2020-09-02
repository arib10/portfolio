
const closeIcon = document.getElementById("close-icon");
const openIcon = document.getElementById("open-icon");
const navbar = document.querySelector(".navbar");
const heroImg = document.getElementById("hero-image");

openIcon.onclick = () => {
    navbar.style.display = "block";
    openIcon.style.display = "none";
    closeIcon.style.display = "inline-block";
}
closeIcon.onclick = () => {
    navbar.style.display = "none";
    closeIcon.style.display = "none";
    openIcon.style.display = "inline-block";
}
