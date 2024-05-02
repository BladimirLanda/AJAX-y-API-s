const createCard = (digimon) => {
    const card = document.createElement("div");
    card.classList.add("digimon-card")

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("digimon-info")

    const name = document.createElement("h2");
    name.classList.add("digimon-name");
    name.textContent = digimon.name;

    const level = document.createElement("p");
    level.classList.add("digimon-level");
    level.textContent = digimon.level;

    infoDiv.appendChild(name);
    infoDiv.appendChild(level);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("digimon-img-container");

    const image = document.createElement("img");
    image.classList.add("digimon-img");
    image.src = digimon.img;
    image.alt = digimon.name;

    imageContainer.appendChild(image);

    card.appendChild(infoDiv);
    card.appendChild(imageContainer);

    return card;
}

//Función Asíncrona (https://digimon-api.vercel.app/)
const loadDigimon = async () => {
    const digimonGrid = document.getElementById("digimon__grid");
    try {
        const response = await axios.get("https://digimon-api.vercel.app/api/digimon");
        //console.log(response);
        const digimons = response.data;
        digimonGrid.innerHTML = "";
        const digimonName = document.getElementById("digimon__searchName");
        digimonName.value = "";
        const digimonLevel = document.getElementById("digimon__searchLevel");
        digimonLevel.value = "";


        for (let digimon of digimons) {
            const digimonCard = createCard(digimon);
            digimonGrid.appendChild(digimonCard);
        }
    }
    catch (error) {
        console.log(`Error axios: ${error}`);
    }
}
document.addEventListener("DOMContentLoaded", loadDigimon);

//---------------Busqueda Nombre
const searchDigimon = async () => {
    const digimonName = document.getElementById("digimon__searchName").value.toLowerCase();
    if (digimonName) {
        const digimonGrid = document.getElementById("digimon__grid");
        try {
            const response = await axios.get(`https://digimon-api.vercel.app/api/digimon/name/${digimonName}`);
            //console.log(response);
            digimonGrid.innerHTML = "";
            const digimonCard = createCard(response.data[0]);
            digimonGrid.appendChild(digimonCard);
        }
        catch (error) {
            console.log(`Error axios: ${error}`)
        }
    }
}

const clickButton = document.getElementById("search-button");
clickButton.addEventListener("click", searchDigimon);

const enterSearch = document.getElementById("digimon__searchName");
enterSearch.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        searchDigimon();
    }
});

//---------------Busqueda Nivel
const searchLevel = async () => {
    const digimonLevel = document.getElementById("digimon__searchLevel").value.toLowerCase();
    if (digimonLevel) {
        const digimonGrid = document.getElementById("digimon__grid");
        try {
            const response = await axios.get(`https://digimon-api.vercel.app/api/digimon/level/${digimonLevel}`);
            //console.log(response);
            const digimonsLevel = response.data;
            digimonGrid.innerHTML = "";

            for (let digimon of digimonsLevel) {
                const digimonCard = createCard(digimon);
                digimonGrid.appendChild(digimonCard);
            }
        }
        catch (error) {
            console.log(`Error axios: ${error}`)
        }
    }
}

const clickButton2 = document.getElementById("search-button");
clickButton2.addEventListener("click", searchLevel);

const enterSearch2 = document.getElementById("digimon__searchLevel");
enterSearch2.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        searchLevel();
    }
});

//---------------Restaurar
const buttonReset = document.getElementById("rest-button");
buttonReset.addEventListener("click", () => {
    loadDigimon();
    console.log("Se restauro");
});