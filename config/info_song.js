const conexion = require('./database')

const express = require('express');
const cors = require('cors');
const multer = require('multer');

const route = express.Router()


const storage = multer.diskStorage({
    destination: '../uploads/audio',
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now() + '.mp3')
    }
})

const upload = multer({
   storage: storage
})


route.get('/',(req, res) => { 
    let sql = "SELECT * FROM info_song"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error: "+ err.message);
            throw err
        }else{
            res.json(resul)                      
        }
    });
});


route.get('/:code_song',(req, res) => { 
    let sql = "SELECT * FROM album where ID_song = ?"
    conexion.query(sql,[req.params.code_song], (err, resul) => {
        if(err) {
            console.log("Error: "+ err.message);
            throw err
        }else{
            res.json(resul)                      
        }
    });
});

route.post('/song', upload.single('song'), (req, res) => {   
       const song = req.file
       const ubicacion = song.path
    sql = 'Select IFNULL(MAX(ID_song), 0)+1 valor from info_song;'
    let codigo = 0
    conexion.query(sql,(err, dato) =>{
        if (err) {
            console.log("Error");
            return -1;
        } else {            
            codigo=dato[0].valor
            console.log('Codigo maximo',codigo);                
            let name_song = req.body.name_song;
            let lyrics = req.body.lyrics;
            let melody = req.body.melody;
            let gender = req.body.gender;                   
            let ID_album = req.body.ID_album;                             
            let sql = 'Insert into info_song (ID_song, name_song, lyrics, melody, gender, URL, ID_album) values(?, ?, ?, ?, ?, ?, ?)';
            conexion.query(sql,[codigo, name_song, lyrics, melody, gender, ubicacion ,ID_album], function(err,resul){
                if(err){
                    console.log(err.message);
                    res.json({ mensaje:'Error no se adiciono'});
                    throw res.json(err.message)
                }else{
                    res.json(resul);
                    console.log('Positiva, se adiciono');
                }
            });
        }
    });
});

route.put('/:code_song', (req,res) => {

    let code_song = req.params.code_song;
    let name_song = req.params.name_song;
    let lyrics = req.body.lyrics;
    let melody = req.body.melody;
    let gender = req.body.gender;    
    let URL = req.body.URL;    
    let ID_album = req.body.ID_album;    
    
    let sql = 'Update info_song set name_song=? lyrics=?, melody=?, gender=?, URL=?, ID_album=? where ID_song = ?';
    conexion.query(sql,[lyrics, name_song, melody, gender, URL, ID_album, code_song],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
            console.log('Positiva, se modifico');
        }
    });
});

route.delete('/:code_song', (req, res)=>{

    let code_song = req.params.code_song;    

    let sql = 'Delete from info_song where ID_song = ?';
    conexion.query(sql, [code_song], (err, resul) => {
        if (err) {
            console.log('Error al Eliminar', sql);            
        } else {
            res.json(resul)
            console.log('Se elimino');
        }
    });
});

module.exports = route;