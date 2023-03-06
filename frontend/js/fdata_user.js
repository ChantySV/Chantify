const url = 'http://localhost:3000/profile' 

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    });
} 

formcreate.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(url, {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({        
            name_user:name_user.value,
            last_name:last_name.value,
            mail:mail.value,
            user_pass:user_pass.value
        })
    })
    .then(response => response.json())
    .then(data => { console.log(data);})
});
updateUser.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/profile/s', {
        method: "PUT",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({        
            name_user:name_user.value,
            last_name:last_name.value,            
            user_pass:user_pass.value
        })
    })
    .then(response => response.json())
    .then(data => { console.log(data);})
});