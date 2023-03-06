const url = 'http://localhost:3000/login' 


const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    });
} 

formlogin.addEventListener("submit", (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/login', { 
        mail:mail.value,
        user_pass:user_pass.value
    })          
    .then(response => { 
        sessionStorage.setItem('Token', response.data.token);     
        location.href = "./mainUser.html"                   
    })             
    .catch(err => console.log(err));
})                
// alert(sessionStorage.token)