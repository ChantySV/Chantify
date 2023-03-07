const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    });
} 

formAlbum.addEventListener("submit", (e) => {
    e.preventDefault()
    var radios = document.getElementsByName("tipe");
    var selected = Array.from(radios).find(radio => radio.checked);
    alert(selected.value);
    axios.post('http://localhost:3000/album', { 
        name_album:name_album.value,
        tipe: selected.value
    })          
    .then(response => { console.log(response.data)
        alert('Felicidades Creaste un Album')
    })             
    .catch(err => console.log(err));
})  
// } 