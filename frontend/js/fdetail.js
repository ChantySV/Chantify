let token = sessionStorage.getItem('Token')
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

formdetail.addEventListener("submit", (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/detail', config,{ 
        ID_playlist:ID_playlist.value,
        ID_song:ID_song.value,
    })          
    .then(response => { console.log(response.data)
        alert('Felicidades Añadiste una Cancion')
    })             
    .catch(err => console.log(err));
});