formdetail.addEventListener("submit", (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/detail', { 
        ID_playlist:ID_playlist.value,
            ID_song:ID_song.value,
    })          
    .then(response => { console.log(response.data)
        alert('Felicidades Añadiste una Cancion')
    })             
    .catch(err => console.log(err));
});