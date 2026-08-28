const scrollerDiv = document.querySelector(".scroller");
let orbitItems = [];
let orbitAmount = 0;

function addOrbitItem(link, tooltip, icon, specialSize = "3rem"){
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

function updateOrbitTransforms(){
    orbitItems.forEach(orbitItem => {
        orbitItem.style.transform = `translate(-50%, -50%) rotate(calc(var(--i) * ${360 / orbitAmount}deg)) translateY(-11rem) rotate(calc(var(--i) * -${360 / orbitAmount}deg))`;
    })
}

function createIcon(link, size){
    const icon = document.createElement("img");

    icon.src = link;
    icon.style.width = size;
    icon.classList.add("orbit-icon")

    return icon;
}

function createLink(target){
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