const url = 'http://localhost:3000/detail' 

formdetail.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(url, {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({        
            ID_playlist:ID_playlist.value,
            ID_song:ID_song.value,            
        })
    })
    .then(response => response.json())
    .then(data => { console.log(data);})
});