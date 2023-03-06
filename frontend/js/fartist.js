const url = 'http://localhost:3000/artist' 

formartist.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(url, {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({        
            nickname:nickname.value,
            ID_user:ID_user.value
        })
    })
    .then(response => response.json())
    .then(data => { console.log(data);})
});