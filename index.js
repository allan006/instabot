const readline = require('readline-sync');
const movieInfo = require('./src/movieInfo');
const publisher = require('./src/publisher');
const downloader = require('./src/downloader');
const env = require('./config/env');

async function start() {
    const imdb = {
        id: 0
    };

    imdb.id = askTheId();

    function askTheId() {
        return readline.question('Digite o ID do filme que voce quer publicar: ')
    }

    const movieData = await movieInfo(imdb.id);

    downloader(movieData.media, movieData.name);

    const image = './media/'+movieData.name+'.jpeg';

    await publisher(env.INSTA_USER, env.INSTA_PASSWORD, image, movieData.subtitle);
   
}
//tt0111161
start();