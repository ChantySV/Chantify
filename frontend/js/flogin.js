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
        console.log(response.data);
        sessionStorage.setItem('Token', response.data.token);  
        if (!response.data.link) {
            location.href = "./mainUser.html"
        } else {
            location.href = response.data.link 
        }                
    })             
    .catch(err => console.log(err));
})                
