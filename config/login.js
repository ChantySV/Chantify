const conexion = require("../config/database");
const {JWT_SECRET} = require('../routes/parametros')

const express = require("express");
const cors = require("cors");
const encrypt = require("bcryptjs");
const jwt = require ('jsonwebtoken');

const route = express.Router();



route.post("/", async function (req, res) {
  let data = {
    mail: req.body.mail,
    user_pass: req.body.user_pass,
  };

  let sql = "Select user_pass from data_user where mail = ?";
  conexion.query(sql, req.body.mail, (err, resul) => { //Se hace la verificacion de que el mail sea existente en la base de datos
    if (err) {
      console.log('Error correo');
      res.json("Correo Incorrecto");
    } 
    else {
      conexion.query(sql, req.body.mail, async function (err, resul) {//Se hace la verificacion de que el mail no este en blanco
        if (resul.length == 0) {
            res.json('El correo no puede estar vacio')
            //console.log('El correo no puede estar vacio');
        } else {
            let passBD = resul[0].user_pass
            if (await encrypt.compare(req.body.user_pass, passBD)){//Se verifica que la contraseña coincida con la encriptada en la base de datos                                                         
                  jwt.sign(data, JWT_SECRET, (err, token) => { //Se asigna un token para que posteriormente sera una medida permitará navegar a través de la pagina
                    if (err) {
                        console.log('Error token');   
                        console.log(err)                                                 
                    } else {                                
                      let sql2 = "select ID_user from data_user where mail = ?" //Se asigna un variable global una vez que se haya hecho todos los pasos anteriores dando acceso a la pagina                   
                      conexion.query(sql2, data.mail, (err, resul)=>{
                        global.ID_USER = resul[0].ID_user                     
                        let sql3 = "select ID_artist from artist where ID_user = ?" //Y este paso redirige a una pagina segun el usuario y los permisos que este tiene, y despues de esto se muestra una interfaz diferente
                        conexion.query(sql3,  global.ID_USER, (err, resul2)=>{
                          let link = {                        
                            link: './mainArtist.html',
                            token:token
                          }
                          if (resul2.length == 0) {
                            res.json({token:token});                                                                              
                          } else {
                            res.json(link);     
                            global.ID_ARTIST = resul2[0].ID_artist                                         
                          }                           
                        })  
                      })
                                                                                                                                                            
                    }                    
                });                            
          } else {
                console.log('Contraseña Incorrecta');
                res.json('Error')
            }
          }
        })
      };
    });
});

module.exports = route;
// route.post("/", async function (req, res) {
//   let data = {
//     mail: req.body.mail,
//     user_pass: req.body.user_pass,
//   };
  
//   let sql = "Select user_pass from data_user where mail = ?";
//   conexion.query(sql, req.body.mail, (err, resul) => {
//     if (err) {

//       res.json("ERROR");

//     } 
//     else {

//       conexion.query(sql, req.body.mail, async function (err, resul) {

//         if (resul.length == 0) {

//             res.json('Datos incorrectos')

//         } else {
//             let passBD = resul[0].user_pass

//             if (await encrypt.compare(req.body.user_pass, passBD)) {

//               let token = req.header('Authorization')

//               jwt.verify(token.[], JWT_SECRET, (errt, datost)=>{
//                 if (errt) {

//                   console.log('Error autentificacion');
//                   res.json(datost)

//                 } else {

//                   console.log('Tienes acceso');
//                   res.json('OK')
//                   console.log(datost)
                  
//                 }
                
//               })                
//             } else {
//                 console.log('Contraseña Incorrecta');
//                 res.json('Error')
//             }
//         }
//       });
//     }
//   });
// });