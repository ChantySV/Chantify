//MOSTRAR PLAYLIST
const contenedorPlaylist = document.getElementById('canciones')
let resultadoPlaylist = ''
const cargaPlaylist = (datos)=>{
    datos.forEach(dato => {        
        resultadoPlaylist +=         
        `<tr>
        <td>
            <button class='btn-playlist' data-id='${dato.ID_playlist}'>
                ${dato.name_playlist}
            </button>
        </td>
        <td>
            <button class='btn-DeletePlaylist'>Eliminar</button>
        </td>
        </tr>`
        playlist = dato.ID_playlist
    })
    contenedorPlaylist.innerHTML = resultadoPlaylist
}

axios.get('http://localhost:3000/playlist/playlistUser') 
    .then(response =>  cargaPlaylist(response.data))     
    .catch(err => console.log(err)); 


contenedorPlaylist.addEventListener('click', (event) =>{
    if (event.target.classList.contains('btn-playlist')) {
        let code_playlist = event.target.dataset.id;
        axios.get(`http://localhost:3000/detail/${code_playlist}`)
        .then(response=> {
            cargaCanciones(response.data);
        })
        .catch(err => console.log(err));
    } else if (event.target.classList.contains('btn-DeletePlaylist')) {
        let code_playlist = event.target.parentNode.parentNode.querySelector('.btn-playlist').dataset.id;
        axios.delete(`http://localhost:3000/playlist/${code_playlist}`)
        .then(response=> {
            // Actualizar la lista de reproducción
            axios.get('http://localhost:3000/playlist/playlistUser') 
            .then(response =>  cargaPlaylist(response.data))     
            .catch(err => console.log(err)); 
            location.reload()
        })
        .catch(err => console.log(err));
    }
})
//MOSTRAR CANCIONES
const contenedorCanciones = document.getElementById('contenedor-canciones')
const cargaCanciones = (datos)=>{
    let resultadoCanciones = '';
    datos.forEach(dato => {
        resultadoCanciones += 
        `<tr data-song='${dato.ID_song}'>
        <td ><h4>${dato.name_song}</h4></td>
        <td ><h4>${dato.nickname}</h4></td>
        <td ><h4>${dato.name_album}</h4></td>
        <td>
            <audio controls>
                <source src="${dato.URL}">
            </audio>
        </td>
        <td><button type="submit" class="btnDeleteSong">Eliminar</button>
        </td>                            
        </tr>`
    })
    contenedorCanciones.innerHTML = resultadoCanciones
}

contenedorCanciones.addEventListener('click', (event) => {
    if (event.target.classList.contains('btnDeleteSong')) {
      let codigoCancion = event.target.dataset.song;
      let code = contenedorPlaylist.event.target.dataset.querySelector('.btn-playlist').dataset.id;
      let codigoPlaylist = event.target.dataset.querySelector('.btn-playlist').dataset.id;
      axios.delete(`http://localhost:3000/detail/${codigoPlaylist}/xd/${codigoCancion}`)      
        .then(response => {
          // Actualizar la lista de canciones
          axios.get(`http://localhost:3000/detail/${codigoPlaylist}`)
            .then(response => {
              cargaCanciones(response.data);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  });
  