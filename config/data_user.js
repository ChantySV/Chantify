const conexion = require('./database')
const {JWT_SECRET} = require('../routes/parametros')


const express = require('express');
const cors = require('cors');
const encrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const { json } = require('express');

const route = express.Router()



route.get('/',(req, res) => { 
    let sql = "SELECT * FROM data_user"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error: "+ err.message);
            throw err
        }else{
            res.json(resul)                      
        }
    });
});


route.get('/:code_user',(req, res) => { 
    let sql = "SELECT * FROM data_user where ID_user = ?"
    conexion.query(sql,[req.params.code_user], (err, resul) => {
        if(err) {
            console.log("Error: "+ err.message);
            throw err
        }else{
            res.json(resul)                      
        }
    });
});

route.post('/n', (req, res) => {    
    sql = 'Select IFNULL(MAX(ID_user), 0)+1 valor from data_user;'
    let codigo = 0

    conexion.query(sql, async (err, dato) =>{
        if (err) {
            console.log("Error");            
        } else {            
            codigo=dato[0].valor
            console.log('Codigo maximo', codigo);
            let pass_encrip = await encrypt.hash(req.body.user_pass, 10)

            let data = {
                ID_user: codigo,
                name_user:req.body.name_user,
                last_name:req.body.last_name,
                mail:req.body.mail,
                user_pass:pass_encrip
            }

            let sql = 'Insert into data_user set ?';            
            conexion.query(sql, data, function(err, resul){
                if (err) {
                    console.log(err.mensaje);
                    res.json({mensaje:'Error datos'});  
                } else {
                    let sql1 = 'Select IFNULL(MAX(ID_playlist), 0)+1 valor from playlist;'
                    conexion.query(sql1, (err, dato) =>{
                    let codigoP = dato[0].valor  
                        let play = {
                            ID_playlist: codigoP,
                            name_playlist: 'Tus me gusta',
                            ID_user: codigo
                        }
                        let sql2 = 'Insert into playlist set ?';
                        conexion.query(sql2 ,play, function(err,resul){
                            if(err){
                                console.log(err.message);                                                                
                            }else{
                                
                                console.log('Positiva, se adiciono la playlist');
                            }
                        });
                    console.log('Se adiciono');
                    res.json(resul)})
                }                    
            })            
        }
    });
});

route.put('/s',async(req,res) => {

    let pass_encrip = await encrypt.hash(req.body.user_pass, 10)

    let code_user = global.ID_USER;
    let name_user = req.body.name_user;
    let last_name = req.body.last_name;    

    let sql = 'Update data_user set name_user=? , last_name= ?, user_pass= ? where ID_user = ?';
    conexion.query(sql,[name_user, last_name, pass_encrip, code_user],function(err,resul){
        if(err){
            console.log(err);
        }else{
            res.json(resul);
            console.log('Positiva, se modifico');
        }
    });
});

route.delete('/:code_user', (req, res)=>{

    let code_user = req.params.code_user;    

    let sql = 'Delete from data_user where ID_user = ?';
    conexion.query(sql, [code_user], (err, resul) => {
        if (err) {
            console.log('Error al Eliminar', sql);            
        } else {
            res.json(resul)
            console.log('Se elimino');
        }
    });
});

module.exports = route;