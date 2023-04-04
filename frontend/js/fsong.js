const contenedorCanciones = document.getElementById('contenedor')
let resultadoCanciones = ''
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    });
} 
const cargaCanciones = (datos)=>{
    datos.forEach(dato => {        
        resultadoCanciones +=         
        `<tr>
        <td>
            <h4>${dato.name_song}</h4>
        </td> 
        <td>
            <h4>${dato.gender}</h4>
        </td>       
        <td>
            <button class='btnAñadirCancion' data-id='${dato.ID_song}'>Añadir a tus me gusta</button>
        </td>
        </tr>`       
    })
    contenedorCanciones.innerHTML = resultadoCanciones
}
axios.get('http://localhost:3000/song')
.then(response => cargaCanciones(response.data))
.catch(err => console.log(err));


//GET ID_USER TUS ME GUSTA
axios.get('http://localhost:3000/song/like')
.then(response => console.log(response.data))
.catch(err => console.log(err));

on(contenedorCanciones, 'click', '.btnAñadirCancion', e => {
    const id_cancion = e.target.dataset.id      
    axios.get('http://localhost:3000/song/like')
    .then(response => {
        // Guardamos el ID del usuario en una variable
        const ID_playlist = response.data[0].ID_playlist
        axios.post('http://localhost:3000/detail', {
            ID_playlist: ID_playlist,
            ID_song: id_cancion
        })
        .then(response => {
            console.log(response.data)
            alert('Canción añadida a tus me gusta')
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
})





// on(contenedorCanciones, 'click', '.btnAñadirCancion', e => {
//     const fila = e.target.closest('tr')
//     const id_cancion = fila.dataset.id    
//     axios.post('http://localhost:3000/detail', {
//         ID_song:id_cancion

//     })
//     .then(response => {console.log(response.data)
//         alert('Canción añadida a tus me gusta')
//     })
//     .catch(err => console.log(err));
// })