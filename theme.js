const themeToggle = document.querySelector(".theme-toggle");
const icon = themeToggle.querySelector("img")
const savedTheme = localStorage.getItem("theme") || "light";

function setTheme(theme){
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.backgroundTheme = theme;
    themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );

    theme === "dark" ? icon.src = "./icons/sun.svg" : icon.src = "./icons/moon.svg"

}

setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    const blobby = document.createElement("div")

    blobby.classList.add("blobby", nextTheme);
    document.body.appendChild(blobby);

    requestAnimationFrame(() => {
        blobby.style.scale = "50";
    });

    blobby.addEventListener("transitionend", () => {
        setTheme(nextTheme);
        blobby.remove();
    }, { once: true });
});