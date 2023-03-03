const conexion = require('./database')

const express = require('express');
const cors = require('cors');

const route = express.Router()


route.get('/',(req, res) => { 
    // sql ="select nickname, album.ID_artist, album.realese, album.ID_artist from artist inner join album on artist.ID_artist = album.ID_artist order by album.realese asc"
    let sql = "select artist.nickname, count(album.ID_artist)as Conteo from artist,album where artist.ID_artist = album.ID_artist  group by album.ID_artist , artist.nickname  order by Conteo desc;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error: "+ err.message);
            throw err
        }else{
            //DATE            
            // for (let index = 0; index < resul.length; index++) {  
            //     let fecha = new Date(resul[index].realese);                              
            //     let full = (fecha.getFullYear() + '/'+ (fecha.getMonth()+1) + '/' + fecha.getDay())  
            //     resul[index].realese = full                                                                         
            // }            
            res.json(resul)
        }
    });
});

module.exports = route;