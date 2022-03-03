const showResult = () => {
    const inputValue = document.getElementById("search-box").value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputValue}`;
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data.player[0]))
}