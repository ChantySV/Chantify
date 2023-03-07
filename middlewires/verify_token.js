const {JWT_SECRET} = require ('../routes/parametros')

const jwt = require ('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    let token = req.header('Authorization')
    if (!token) {
        console.log('Token no encontrado'); 
        return res.status(400).json({mensaje:'Token no encontrado'})
    } else {        
    jwt.verify(token, JWT_SECRET, (err) => {
        if(err) {
            res.redirect('https://www.google.com');
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