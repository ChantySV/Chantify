const url = 'http://localhost:3000/playlist' 

formplaylist.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(url, {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({        
            name_playlist:name_playlist.value,                     
        })
    })
    .then(response => response.json())
    .then(data => { console.log(data);})
});