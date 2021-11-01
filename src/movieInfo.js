const axios = require('axios');
const env = require('../config/env');

async function movieInfo(imdb) {
    return axios.get("https://api.themoviedb.org/3/find/"+imdb+"?api_key="+env.API_KEY+"&language=pt-BR&external_source=imdb_id")
            .then(response => {
                let movie = {
                    name: response.data.movie_results[0].title,
                    subtitle: response.data.movie_results[0].title+'\r\n'+response.data.movie_results[0].overview,
                    media: "https://image.tmdb.org/t/p/original"+response.data.movie_results[0].poster_path
                };
                return movie;
            }).catch((err) => {
                console.error("ops! ocorreu um erro " + err);
            });
}
module.exports = movieInfo;