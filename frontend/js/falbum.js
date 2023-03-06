let input1 = document.getElementById('sencillo')
let input2 = document.getElementById('album')

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    });
} 


// if (document.getElementsByName('sencillo')) {
//     formAlbum.addEventListener("submit", (e) => {
//         e.preventDefault()
//         axios.post('http://localhost:3000/artist', { 
//             name_album:name_album.value        
//         })          
//         .then(response => { console.log(response.data)
//             alert('Felicidades Creaste una cancion')
//         })             
//         .catch(err => console.log(err));
//     })
// } else {
    formAlbum.addEventListener("submit", (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/artist', { 
            name_album:name_album.value,
            tipe:tipe.value
        })          
        .then(response => { console.log(response.data)
            alert('Felicidades Creaste un Album')
        })             
        .catch(err => console.log(err));
    })  
// } 