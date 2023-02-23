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
  conexion.query(sql, req.body.mail, (err, resul) => {
    if (err) {

      res.json("ERROR");

    } 
    else {

      conexion.query(sql, req.body.mail, async function (err, resul) {

        if (resul.length == 0) {

            res.json('Datos incorrectos')

        } else {

            let passBD = resul[0].user_pass
            if (await encrypt.compare(req.body.user_pass, passBD)){                        
                  console.log('Tienes acceso');
                  res.json('OK')                              
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