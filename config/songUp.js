const conexion = require('./database')

const express = require('express');
const cors = require('cors');
const multer = require('multer')
const mimeTypes = require('mime-types')

const route = express.Router()

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req,file,cb){
        cb("",Date.now() +"." + mimeTypes.extension(file.mimetype))
    }
})

const upload = multer({
    storage: storage
})



route.get('/',(req, res) => { 
    res.json(__dirname)
});

route.post('/upload-file', upload.single('avatar'), function(req, res){
    const file = req.file;
    const name_song = file.originalname;
    const storage = file.path;

    const query = ''


})


// route.post('/', upload.single('avatar'), (req, res) => {   
    
//     sql = 'Select IFNULL(MAX(ID_song), 0)+1 valor from info_song;'
//     let codigo = 0
//     conexion.query(sql,(err, dato) =>{
//         if (err) {
//             console.log("Error");
//             return -1;
//         } else {            
//             codigo=dato[0].valor
//             console.log('Codigo maximo',codigo);           

//             let data = {
//                 ID_song: codigo,
//                 name_song:req.body.name_song,
//                 lyrics:req.body.lyrics,
//                 melody:req.body.melody,
//                 gender:req.body.gender,
//                 URL:req.body.link,
//                 ID_album:req.body.ID_album
//             }
//             let sql = 'Insert into info_song set ?';
//             conexion.query(sql,data, function(err,resul){
//                 if(err){
//                     console.log(err.message);
//                     res.json({ mensaje:'Error no se adiciono'});
//                     throw res.json(err.message)
//                 }else{
//                     res.json(resul);
//                     console.log('Positiva, se adiciono');
//                 }
//             });
//         }
//     });
// });

module.exports = route;