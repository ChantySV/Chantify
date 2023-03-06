
//MOSTRAR PLAYLIST
const contenedorPlaylist = document.getElementById('contenedor-playlist')
let resultadoPlaylist = ''
const cargaPlaylist = (datos)=>{
    datos.forEach(dato => {
        resultadoPlaylist += 
        `<p>
            ${dato.name_playlist}
        </p>`
    })
    contenedorPlaylist.innerHTML = resultadoPlaylist
}
   
axios.get('http://localhost:3000/playlist/playlistUser') 
    .then(response =>  console.log(response.data)) 
    .catch(err => console.log(err)); 

// //MOSTRAR CANCIONES
// const contenedorCanciones = document.getElementById('contenedor-canciones')
// let resultadoCanciones = ''

// const cargaDatos = (datos)=>{
//     datos.forEach(dato => {
//         resultadoCanciones += 
//         `<audio controls>
//             <source src="${dato.URL}">
//         </audio>`
//     })
//     contenedor.innerHTML = resultadoCanciones
// }
   
// axios.get('http://localhost:3000/detail/detail_playlist') 
//     .then(response => console.log(response.data) ) 
//     .catch(err => console.log(err)); 
