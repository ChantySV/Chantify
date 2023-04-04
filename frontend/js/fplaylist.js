


fetch('http://localhost:3000/playlist', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: token,
    },
    })
    .then((response) => response.json())
    .then((data) => CargaDetalle(data))
    .catch((error) => console.log(error));
    const on = (element, event, selector, handler) => {
        element.addEventListener(event, (e) => {
            if (e.target.closest(selector)) {
            handler(e);
            }
        });
    };
// formplaylist.addEventListener("submit", (e) => {
//     e.preventDefault()
//     axios.post('http://localhost:3000/playlist', { 
//         name_playlist:name_playlist.value,        
//     })          
//     .then(response => { console.log(response.data)
//         alert('Se creo la lista', name_playlist.value)
//         location.href = "./mainArtist.html"   
//     })             
//     .catch(err => console.log(err));
// })    