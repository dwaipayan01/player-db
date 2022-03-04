const showResult = () => {
    const inputValue = document.getElementById("search-box");
    const inputValueText = inputValue.value;
    inputValue.value = "";
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputValueText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResult(data.player))
}
const displayResult = players => {
    const mainArea = document.getElementById("main-area");
    mainArea.textContent = "";



    for (const player of players) {
        const errorMessage = document.getElementById("error");

        if (player.length == 0) {
            errorMessage.style.display = "block";
        }
        else {
            errorMessage.style.display = "none";
            console.log(player);
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = ` <div class="card mt-5">
            <img src="${player.strThumb}" class="card-img-top w-25 ms-5" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name : ${player.strPlayer}</h5>
                <p class="card-text">Country : ${player.strNationality}</p>
                <button class="btn btn-danger">Delete</button>
                <button onclick="loadData('${player.idPlayer}')" class="btn btn-success">Details</button>
            </div>
            
        </div>
            
            
            `;
            mainArea.appendChild(div);
        }

    }


}
const loadData = id => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => saveData(data.players[0]))
}
const saveData = info => {
    console.log(info.strGender);
    if (info.strGender == "Male") {
        document.getElementById("male").style.display = "block";
        document.getElementById("female").style.display = "none";

    } else {
        document.getElementById("male").style.display = "none";
        document.getElementById("female").style.display = "block";
    }
    const datailsArea = document.getElementById("details-area");
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card w-50 mx-auto mt-5">
                        <img src="${info.strThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h3>${info.strPlayer}</h3>
                          <p class=${info.strBirthLocation}</p>
                        </div>
                      </div>
    `;
    datailsArea.appendChild(div);

}