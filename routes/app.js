const express = require('express');
const cors = require('cors');
const app = express();

const verifyToken = require('../middlewires/verify_token')


app.use(express.json());
app.use(cors());

const profile = require('../config/data_user')
app.use('/profile', verifyToken, profile)

const artist = require('../config/artist')
app.use('/artist', verifyToken, artist)

const album = require('../config/album')
app.use('/album', verifyToken, album)

const info_song = require('../config/info_song')
app.use('/song', verifyToken, info_song)

const playlist = require('../config/playlist')
app.use('/playlist', verifyToken, playlist)

const detail = require('../config/detail_playlist')
app.use('/detail', verifyToken, detail)

const detail = require('../config/detail_playlist')
app.use('/detail', verifyToken, detail)

const login = require('../config/login')
app.use('/login', login)


const puerto = 3000
app.listen(puerto, function() {
    console.log('Servidor OK en puerto: '+puerto);
});