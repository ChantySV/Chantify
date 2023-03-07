//MOSTRAR PLAYLIST
const contenedorPlaylist = document.getElementById('canciones')
let resultadoPlaylist = ''
const cargaPlaylist = (datos)=>{
    datos.forEach(dato => {        
        resultadoPlaylist +=         
        `<button class='btn-playlist' data-id='${dato.ID_playlist}'>
            ${dato.name_playlist}
        </button>`
    })
    contenedorPlaylist.innerHTML = resultadoPlaylist
}

axios.get('http://localhost:3000/playlist/playlistUser') 
    .then(response =>  cargaPlaylist(response.data))     
    .catch(err => console.log(err)); 

//MOSTRAR CANCIONES
const contenedorCanciones = document.getElementById('contenedor-canciones')

const cargaCanciones = (datos)=>{
    let resultadoCanciones = '';
    datos.forEach(dato => {
        resultadoCanciones += 
        `<tr>
        <td ><h4>${dato.name_song}</h4></td>
        <td ><h4>${dato.nickname}</h4></td>
        <td ><h4>${dato.name_album}</h4></td>
        <td>
            <audio controls data-song='${dato.id_song}'>
                <source src="${dato.URL}">
            </audio>
        </td>
        <td class="table-dark"><button type="submit" class="btnDelete">Eliminar</button>
        </td>                            
        </tr>`
    })
    contenedorCanciones.innerHTML = resultadoCanciones
}
   
contenedorPlaylist.addEventListener('click', (event) =>{
    if (event.target.classList.contains('btn-playlist')) {
        const ID_playlist = event.target.dataset.id;
        axios.get(`http://localhost:3000/detail/${ID_playlist}`)
        .then(response=> {
            cargaCanciones(response.data);
        })
        .catch(err => console.log(err));        
    }    
})
// contenedorCanciones.addEventListener('click', (event) => {
//     if (event.target.classList.contains('btnDelete')) {
//       const ID_song = event.target.closest('tr').dataset.song;
//       axios.delete(`http://localhost:3000/songs/${ID_song}`)
//         .then(response => console.log(response.data))
//         .catch(err => console.log(err)); 
//     }
//   });