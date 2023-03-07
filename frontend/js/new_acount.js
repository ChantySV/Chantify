const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    });
} 
formcreate.addEventListener("submit", (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/profile/n', { 
        name_user:name_user.value,
            last_name:last_name.value,
            mail:mail.value,
            user_pass:user_pass.value
    })          
    .then(response => { console.log(response.data)
        alert('Felicidades Creaste una Cuenta')
        location.href = "./login.html"
    })             
    .catch(err => console.log(err));
});