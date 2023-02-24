const {JWT_SECRET} = require ('../routes/parametros')

const jwt = require ('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    let token = req.get('Authorization')
    if (!token) {
        console.log('Usuario no registrado');
    } else {        
    jwt.verify(token, JWT_SECRET, (err) => {
        if(err) {
            console.log("Error: Token invalido");            
            throw err
        }else{        
            next()
        }
    });
    }
}

module.exports = verifyToken;

// route.post('/verify', function (req, res,test) { 
//     let token = req.header('Authorization')
//     //let token = req.get('Authorization')    
//     jwt.verify(token, JWT_SECRET, function(err,datos){
//     if(err) {
//         console.log("Error: "+err.message);
//         throw err
//     }else{
//         res.json(datos)
//         next()
//     }
//     });
// });