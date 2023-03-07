
formplaylist.addEventListener("submit", (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/playlist', { 
        name_playlist:name_playlist.value,        
    })          
    .then(response => { console.log(response.data)
        alert('Se creo la lista', name_playlist.value)
        location.href = "./mainArtist.html"   
    })             
    .catch(err => console.log(err));
})    