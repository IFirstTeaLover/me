const scrollerDiv = document.querySelector(".scroller");
let orbitItems = [];
let orbitAmount = 0;

function addOrbitItem(link, tooltip, icon, specialSize = "3rem") {
    const orbitSlot = document.createElement("div");
    const orbitCounter = document.createElement("div");
    const orbitItem = createLink(link);

    orbitSlot.style = `--i: ${orbitAmount}`;
    orbitSlot.title = tooltip


    orbitSlot.classList.add("orbit-slot");
    orbitCounter.classList.add("orbit-counter");
    orbitItem.classList.add("orbit-item")

    orbitAmount++;

    orbitItem.appendChild(createIcon(icon, specialSize));
    orbitCounter.appendChild(orbitItem);
    orbitSlot.appendChild(orbitCounter);

    orbitItems.push(orbitSlot)
    updateOrbitTransforms();

    scrollerDiv.appendChild(orbitSlot)
}

function updateOrbitTransforms() {
    orbitItems.forEach(orbitItem => {
        orbitItem.style.transform = `translate(-50%, -50%) rotate(calc(var(--i) * ${360 / orbitAmount}deg)) translateY(-11rem) rotate(calc(var(--i) * -${360 / orbitAmount}deg))`;
    })
}

function createIcon(link, size) {
    const icon = document.createElement("img");

    icon.src = link;
    icon.style.width = size;
    icon.classList.add("orbit-icon")

    return icon;
}

function createLink(target) {
    const link = document.createElement("a")

    link.href = target;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    return link;
}

addOrbitItem("https://github.com/IFirstTeaLover", "GitHub", "./icons/logos/github.png")
addOrbitItem("https://discord.com", "Discord", "./icons/logos/Discord-Symbol-Black.svg", "2.5rem")
addOrbitItem("https://modrinth.com/user/BulbaSprout", "Modrinth", "./icons/logos/modrinth.png")
addOrbitItem("https://steamcommunity.com/id/bulbasprout/", "Steam", "./icons/logos/steam.svg")

const announcement = document.querySelector(".announcement");

function toggleAnnouncement() {
    const isExpanded = announcement.classList.contains("is-expanded");

    if (isExpanded) {
        animateAnnouncement(true, () => {
            announcement.classList.remove("is-expanded");
        });
        announcement.setAttribute("aria-expanded", "false");
        return;
    }
    announcement.classList.add("is-expanded");
    announcement.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => animateAnnouncement(false));
}

function animateAnnouncement(reverse, onFinish) {
    const expandedWidth = getExpandedSize().width;
    const expandedHeight = getExpandedSize().height;
    const center = {
        x: window.innerWidth / 2 - expandedWidth / 2,
        y: window.innerHeight / 2 - expandedHeight / 2
    };
    const start = reverse ? center : { x: 0, y: 0 };
    const end = reverse ? { x: 0, y: 0 } : center;
    const sag = 60;
    const controlOne = {
        x: start.x + (end.x - start.x) * 0.25,
        y: start.y + (end.y - start.y) * 0.25 + sag
    };
    const controlTwo = {
        x: start.x + (end.x - start.x) * 0.75,
        y: start.y + (end.y - start.y) * 0.75 + sag
    };
    const keyframes = Array.from({ length: 31 }, (_, index) => {
        const progress = index / 30;
        const inverseProgress = 1 - progress;
        const x = inverseProgress ** 3 * start.x
            + 3 * inverseProgress ** 2 * progress * controlOne.x
            + 3 * inverseProgress * progress ** 2 * controlTwo.x
            + progress ** 3 * end.x;
        const y = inverseProgress ** 3 * start.y
            + 3 * inverseProgress ** 2 * progress * controlOne.y
            + 3 * inverseProgress * progress ** 2 * controlTwo.y
            + progress ** 3 * end.y;

        return { transform: `translate(${x}px, ${y}px)` };
    });

    announcement.animate(keyframes, {
        duration: 350,
        easing: reverse ? "ease-out" : "ease-in",
        fill: "forwards"
    }).finished.then(() => {
        if (onFinish) onFinish();
    });
}

announcement.addEventListener("click", toggleAnnouncement);
announcement.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleAnnouncement();
    }
});

function getExpandedSize() {
    const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const width = Math.min(28 * remPx, window.innerWidth - 2 * remPx);
    const height = 16 * remPx;
    return { width, height };
}