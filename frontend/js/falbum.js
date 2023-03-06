const url = 'http://localhost:3000/album' 

formartist.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(url, {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({        
            name_album:name_album.value,
            tipe:tipe.value,
            ID_artist:ID_artist.value
        })
    })
    .then(response => response.json())
    .then(data => { console.log(data);})
});