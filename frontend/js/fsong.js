const contenedorCanciones = document.getElementById('contenedor')
let resultadoCanciones = ''

const token = sessionStorage.getItem('Token')
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
        `<tr data-id='${dato.ID_song}'>
        <td>
            <h4>${dato.name_song}</h4>
        </td> 
        <td>
            <h4>${dato.gender}</h4>
        </td>       
        <td>
            <button class='btnAñadirCancion'>Añadir a tus me gusta</button>
        </td>
        </tr>`       
    })
    contenedorCanciones.innerHTML = resultadoCanciones
}
axios.get('http://localhost:3000/song/')
.then(response => cargaCanciones(response.data))
.catch(err => console.log(err));


//GET ID_USER TUS ME GUSTA
on(contenedorCanciones, 'click', '.btnAñadirCancion', e => {
axios.get('http://localhost:3000/playlist/tusMeGusta/')
.then(response => console.log(response.data))
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