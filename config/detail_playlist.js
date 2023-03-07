const conexion = require('./database')

const express = require('express');
const cors = require('cors');

const route = express.Router()

route.get('/:code',(req, res) => { 
    let sql = "SELECT info_song.name_song, info_song.URL, album.name_album, artist.nickname, detail_playlist.ID_playlist FROM info_song inner join album on info_song.ID_album = album.ID_album inner join detail_playlist on info_song.ID_song = detail_playlist.ID_song inner join artist on artist.ID_artist = album.ID_artist where detail_playlist.ID_playlist  = ?;"
    conexion.query(sql, req.params.code, (err, resul) => {
        if(err) {
            console.log("Error: "+ err.message);
            throw err
        }else{
            resul.forEach(valor => {                
                valor.URL = "/public/uploads/audio/" + valor.URL
            });                      
            //console.log(resul);
            res.json(resul)
        }
    });
});


route.post('/', (req, res) => {    
            let data = {
                ID_playlist: req.body.ID_playlist,                
                ID_song:req.body.ID_song
            }
            
            let sql = 'Insert into detail_playlist set ?';
            conexion.query(sql,data, function(err,resul){
                if(err){
                    console.log(err.message);
                    res.json({ mensaje:'Error no se adiciono'});
                    throw res.json(err.message)
                }else{
                    res.json(resul);
                    console.log('Positiva, se adiciono');
                }
            });        
    });


route.put('/:code_playlist', (req,res) => {

    let code_playlist = req.params.code_playlist;

    let name_playlist = req.body.name_playlist          

    let sql = 'Update detail_playlist set name_playlist=? where ID_playlist = ?';

    conexion.query(sql,[name_playlist, code_playlist],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
            console.log('Positiva, se modifico');
        }
    });
});

route.delete('/:code_playlist/xd/:code_song', (req, res)=>{      
    let sql = 'Delete from detail_playlist where ID_playlist = ? and ID_song = ?';
    
    conexion.query(sql, [req.params.code_playlist, req.params.code_song], (err, resul) => {
        if (err) {
            console.log('Error al Eliminar', err);            
        } else {
            res.json(resul)
            console.log('Se elimino');
        }
    });
});


route.delete('/general/:code_detail', (req, res)=>{

    let code_detail = req.params.code_detail;    

    let sql = 'Delete from detail_playlist where ID_playlist = ?';
    conexion.query(sql, [code_detail], (err, resul) => {
        if (err) {
            console.log('Error al Eliminar', sql);            
        } else {
            res.json(resul)
            console.log('Se elimino');
        }
    });
});
module.exports = route;