const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    });
} 

formArtist.addEventListener("submit", (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/artist', { 
        nickname:nickname.value,        
    })          
    .then(response => { console.log(response.data)
        alert('Felicidades ahora eres artista :D')
        location.href = "./login.html"
    })             
    .catch(err => console.log(err));
})    