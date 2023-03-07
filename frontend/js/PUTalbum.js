const contenedorAlbum = document.getElementById('contenedor')
let resultadoAlbum = ''

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    });
} 
let ID_Album = null
const cargaAlbum = (datos)=>{
    datos.forEach(dato => {        
        resultadoAlbum +=         
        `<tr data-id='${dato.ID_album}'>
        <td>
            <h4>${dato.name_album}</h4>
        </td> 
        <td>
            <h4>${dato.realese}</h4>
        </td> 
        <td>
            <h4>${dato.tipe}</h4>
        </td> 
        <td>
            <button class='btnAñadirAlbum'>Añadir canciones</button>
        </td>
        </tr>`       
    })
    contenedorAlbum.innerHTML = resultadoAlbum
}
// e.preventDefault()
axios.get('http://localhost:3000/album/albums')          
    .then(response =>  cargaAlbum(response.data))             
    .catch(err => console.log(err));

on(contenedorAlbum, 'click', '.btnAñadirAlbum', e => {
    const fila = e.target.closest('tr');    
    document.getElementById('formulario-venta').style.display = 'block';
    const ID_album = document.getElementById('ID_album')
    ID_album.value = fila.dataset.id
    console.log(ID_album);
})
  